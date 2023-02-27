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
`;
export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [load, setIsLoad] = useState<boolean>(false);
  const inputQuery = useAppSelector((state) => state.user.query);
  const storage = getStorage();

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
    <h1>Loading</h1>
  ) : (
    <PostsWrapper>
      {posts
        .filter((user) => user.user.includes(inputQuery))
        .map((user) => (
          <Post
            key={user.image}
            name={user.user}
            title={user.title}
            image={user.image}
          />
        ))}
    </PostsWrapper>
  );
}
