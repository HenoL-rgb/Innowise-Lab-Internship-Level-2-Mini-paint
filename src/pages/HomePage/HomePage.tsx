import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useAppSelector } from "../../hooks/redux-hooks";
import { HomeWrapper } from "./HomePageStyles";

export default function HomePage() {
  const theme: string = useAppSelector((state) => state.theme.currentTheme);
  const palette: { [key: string]: any } = useAppSelector((state) => {
    if (theme === "light") {
      return state.theme.light;
    } else {
      return state.theme.dark;
    }
  });

  return (
    <HomeWrapper theme={palette}>
      <Header theme={palette} />
      <Outlet />
    </HomeWrapper>
  );
}
