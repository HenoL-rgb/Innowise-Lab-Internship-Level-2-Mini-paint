import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { collection, query, Timestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import userSlice from "../store/slices/userSlice";
import Post from "../components/Post";
import styled from "styled-components";
import { useAppSelector } from "../hooks/redux-hooks";
import { Grid } from "react-loader-spinner";

type UserType = {
  user: string;
  title: string;
  imageRef: string;
  createdAt: Timestamp;
};

type PostType = UserType & {
  image: string;
};

const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  row-gap: 100px;
  background-color: ${(props) => props.theme};
`;

const LoadWrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [load, setIsLoad] = useState<boolean>(false);
  const inputQuery = useAppSelector((state) => state.user.query);
  const storage = getStorage();
  const theme: string = useAppSelector((state) => state.theme.currentTheme);
  const palette: { [key: string]: any } = useAppSelector((state) => {
    if (theme === "light") {
      return state.theme.light;
    } else {
      return state.theme.dark;
    }
  });

  const q = query(collection(db, "posts"));
  const [docs, loading, error, snapshot] = useCollectionData(q);

  useEffect(() => {
    if (!snapshot) return;
    setIsLoad(true);
    if (snapshot?.docChanges()) {
      const t: any[] = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      const promises = t.sort(compare).map(async (user) => {
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
        setPosts([...res]);
        setIsLoad(false);
      });
    }
  }, [docs]);

  function compare(a: any, b: any) {
    let date1 = a.createdAt.seconds;
    let date2 = b.createdAt.seconds;

    if (date1 < date2) {
      return 1;
    }
    if (date1 > date2) {
      return -1;
    }

    return 0;
  }

  return load || posts.length === 0 ? (
    <LoadWrapper>
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
    </LoadWrapper>
  ) : (
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
    </PostsWrapper>
  );
}
