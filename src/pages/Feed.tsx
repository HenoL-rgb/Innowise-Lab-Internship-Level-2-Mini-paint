import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { collection, query } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import userSlice from "../store/slices/userSlice";
import Post from "../components/Post";
import styled from "styled-components";

const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  row-gap: 100px;
  
`
export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [img, setImg] = useState<any>(false);

  const storage = getStorage();

  const q = query(collection(db, "posts"));
  const [docs, loading, error, snapshot] = useCollectionData(q);

  useEffect(() => {
    if (!snapshot) return;
    if (snapshot?.docChanges()) {
      let image = "";
      const t: any[] = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      const promises = t.map(async (user) => {
        const url = await getDownloadURL(ref(storage, user.imageRef))
        console.log(t)
        return {
          ...user,
          image: url,
        }
      })
      Promise.all(promises).then(setPosts)
    }
  }, [docs]);

  return posts.length === 0 ? (
    <h1>Loading</h1>
  ) : (
    <PostsWrapper>
      {posts.map(user => <Post name={user.user} title={user.imageRef} image={user.image} />)}
    </PostsWrapper>
  );
}
