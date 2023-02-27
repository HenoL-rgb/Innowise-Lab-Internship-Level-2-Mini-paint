import { Avatar } from "@mui/material";
import React from "react";
import { PostWrapper, Info, InfoText, Email } from "./PostStyles";

type PostProps = {
  theme: any;
  name: string;
  title: string;
  image: string;
};

export default function Post({ theme, name, title, image }: PostProps) {
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
