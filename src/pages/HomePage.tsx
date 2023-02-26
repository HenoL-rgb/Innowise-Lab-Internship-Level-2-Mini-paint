import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

export const HomeWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: min-content;
  padding-bottom: 50px;
`
export default function HomePage() {
  return (
    <HomeWrapper>
      <Header />
      <Outlet />
    </HomeWrapper>
  );
}
