import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";

type PostProps = {
  theme: any;
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
`;

const PostWrapper = styled.div`
  width: min-content;
  display: grid;
  grid-template-rows: min-content 1fr;
  background-color: ${props => props.theme.header.bg};
  border-radius: 15px;
  color: ${props => props.theme.header.font};
  & #ava {
    padding: 0;
  }
  padding: 15px;

  img {
    background-color: white;
    border: 1px solid ${props => props.theme.header.logo};
    border-radius: 15px;
  }
`;
export default function Post({ theme, name, title, image }: PostProps) {
  console.log(theme)
  return (
    <PostWrapper theme={theme}>
      <Info>
        <div id="ava">
          <Avatar sx={{ bgcolor: "#3f5dab" }}>{name.slice(0,1).toUpperCase()}</Avatar>
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
