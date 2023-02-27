import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { useAppSelector } from "../hooks/redux-hooks";

export const HomeWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.main};
`
export default function HomePage() {
  const theme: string = useAppSelector(state => state.theme.currentTheme);
  const palette: {[key: string]: any} = useAppSelector(state => {
    if(theme === 'light'){
      return state.theme.light;
    } else {
      return state.theme.dark;
    }
  });

  return (
    <HomeWrapper theme={palette}>
      <Header theme={palette}/>
      <Outlet />
    </HomeWrapper>
  );
}
