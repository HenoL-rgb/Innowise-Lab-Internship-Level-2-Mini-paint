import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Post from "../../components/Post/Post";
import { useAppSelector } from "../../hooks/redux-hooks";
import { Grid } from "react-loader-spinner";
import { LoadWrapper, PostsWrapper } from "./FeedStyles";
import { PaletteType, PostType } from "../../types";

export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [load, setIsLoad] = useState<boolean>(false);
  const [lastTimestamp, setLastTimestamp] = useState<any>(new Date());
  const inputQuery = useAppSelector((state) => state.user.query);
  const storage = getStorage();
  const theme: string = useAppSelector((state) => state.theme.currentTheme);
  const palette: PaletteType = useAppSelector((state) => {
    if (theme === "light") {
      return state.theme.light;
    } else {
      return state.theme.dark;
    }
  });

  const lastElement = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("createdAt", "<", lastTimestamp),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    setIsLoad(true);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const t: any[] = [];
      querySnapshot.forEach((doc) => {
        t.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      if (t.at(-1).createdAt.seconds === posts.at(-1)?.createdAt.seconds
      || t.length === 0) {
        return;
      }

      const promises = t.map(async (user) => {
        try {
          const url = await getDownloadURL(
            ref(storage, `${user.user}/${user.imageRef}`)
          );
          return {
            ...user,
            image: url,
          };
        } catch (e) {
          const url = await getDownloadURL(
            ref(storage, `${user.user}/${user.imageRef}`)
          );

          return {
            ...user,
            image: url,
          };
        }
      });
      Promise.all(promises).then((res) => {
        setPosts([...posts, ...res]);
        setIsLoad(false);
      });
    });
    return () => {
      unsubscribe();
    };
  }, [lastTimestamp]);

  useEffect(() => {
    let callback = function (entries: any, observer: any) {
      if (entries[0].isIntersecting && posts.at(-1)) {
        setLastTimestamp(posts.at(-1)?.createdAt ?? lastTimestamp);
      }
    };
    if (!lastElement.current || posts.length === 0) {
      return;
    }
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current);
  }, [posts.length]);

  return (
    <>
      <PostsWrapper theme={palette.main}>
        {posts
          .filter((user) => user.user.includes(inputQuery))
          .map((user) => (
            <Post
              theme={palette}
              key={user.image}
              name={user.user}
              title={user.title}
              image={user.image}
            />
          ))}
        <div
          ref={lastElement}
          style={{
            width: 20,
            height: "20px",
            marginBottom: 30,
            // backgroundColor: 'red',
            position: "absolute",
            bottom: 0,
          }}
        ></div>
        {load && (
          <Grid
            height="80"
            width="80"
            color="#3f5dab"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
      </PostsWrapper>
    </>
  );
}
