import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { removeUser, setQuery, setUser } from "../store/slices/userSlice";
import AccountMenu from "./AccountMenu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, IconButton, TextField, Tooltip } from "@mui/material";
import {
  setColor,
  setFigure,
  setMode,
  setWidth,
} from "../store/slices/figureSlice";
import { setTheme } from "../store/slices/themeSlice";

export const HeaderStyled = styled.div`
  position: sticky;
  display: flex;
  top: 0px;
  z-index: 100;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px 50px;
  background-color: ${(props) => props.theme.header.bg};
  h2 {
    font-size: 1.5rem;
    color: ${(props) => props.theme.header.logo};
    a {
      text-decoration: none;
      color: inherit;
    }
  }

  & .css-v4u5dn-MuiInputBase-root-MuiInput-root:before {
    border-bottom: 1px solid ${(props) => props.theme.header.font};
  }

  & .css-v4u5dn-MuiInputBase-root-MuiInput-root {
    color: ${(props) => props.theme.header.font};
  }

  & .css-v4u5dn-MuiInputBase-root-MuiInput-root:hover:not(
      .Mui-disabled,
      .Mui-error
    ):before {
    border-bottom: 2px solid ${(props) => props.theme.header.font};
  }

  div {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
`;

type HeaderProps = {
  theme: any;
};
export default function Header({ theme }: HeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useAppSelector((state) => state.user.query);

  function handleLogout() {
    dispatch(removeUser());
    dispatch(setTheme("light"));
    localStorage.removeItem("userInfo");
  }

  function handleToDrawPage() {
    dispatch(setFigure("pencil"));
    dispatch(setColor("#000000"));
    dispatch(setMode("fill"));
    dispatch(setWidth("5"));
    navigate("/draw");
  }

  function handleQuery(e: any) {
    dispatch(setQuery(e.target.value));
  }

  return (
    <HeaderStyled theme={theme}>
      <h2>
        <Link to="/">Mini-paint</Link>
      </h2>
      <div>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            color: theme.header.font,
          }}
        >
          <TextField
            value={query}
            size="small"
            id="standard-basic"
            variant="standard"
            placeholder="Search author"
            onChange={handleQuery}
            color="primary"
          />
        </Box>
        <Tooltip title="Create art">
          <IconButton onClick={handleToDrawPage}>
            <AddCircleOutlineIcon
              fontSize="medium"
              sx={{ color: theme.header.buttons }}
            />
          </IconButton>
        </Tooltip>

        <AccountMenu theme={theme} onClick={handleLogout} />
      </div>
    </HeaderStyled>
  );
}
