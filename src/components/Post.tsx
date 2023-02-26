import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";

type PostProps = {
  name: string;
  title: string;
  image: string;
};

const Email = styled.span`
  font-size: 1rem;
`;

const Info = styled.div`
    display: flex;
    column-gap: 1.5rem;
    margin-bottom: 10px;
`;

const InfoText = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
`

const PostWrapper = styled.div`
  width: min-content;
  display: grid;
  grid-template-rows: min-content 1fr;
  background-color: #f7f8fa;
  border-radius: 15px;
  & #ava {
    padding: 0;
  }
  padding: 15px;
  
  img {
    background-color: white;
    border: 1px solid #3f5dab;
    border-radius: 15px;
  }
`;
export default function Post({ name, title, image }: PostProps) {
  return (
    <PostWrapper>
      <Info>
        <div id="ava">
          <Avatar sx={{ bgcolor: "#3f5dab" }}>N</Avatar>
        </div>
        <InfoText>
          <Email>{name}</Email>
          <span>{title}</span>
        </InfoText>
      </Info>
        <img src={image} />
    </PostWrapper>
  );
}
