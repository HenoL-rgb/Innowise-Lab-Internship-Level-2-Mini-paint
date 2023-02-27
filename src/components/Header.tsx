import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { removeUser, setQuery, setUser } from "../store/slices/userSlice";
import AccountMenu from "./AccountMenu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, IconButton, TextField, Tooltip } from "@mui/material";
import { setColor, setFigure, setMode, setWidth } from "../store/slices/figureSlice";

export const HeaderStyled = styled.div`
  position: sticky;
  display: flex;
  top: 0px;
  z-index: 100;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px 50px;
  background-color: #f7f8fa;
  h2 {
    font-size: 1.5rem;
    color: #0e235f;
    a {
      text-decoration: none;
      color: inherit;
    }
  }

  div {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
`;

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useAppSelector((state) => state.user.query);

  function handleLogout() {
    dispatch(removeUser());
    localStorage.removeItem("userInfo");
  }

  function handleToDrawPage() {
    dispatch(setFigure('pencil'));
    dispatch(setColor('#000000'));
    dispatch(setMode('fill'));
    dispatch(setWidth('5'));
    navigate("/draw");
  }

  function handleQuery(e: any) {
    dispatch(setQuery(e.target.value));
  }

  return (
    <HeaderStyled>
      <h2>
        <Link to="/">Mini-paint</Link>
      </h2>
      <div>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            value={query}
            size="small"
            id="standard-basic"
            variant="standard"
            placeholder="Search author"
            onChange={handleQuery}
          />
        </Box>
        <Tooltip title="Create art">
          <IconButton onClick={handleToDrawPage}>
            <AddCircleOutlineIcon fontSize="medium" sx={{ color: "#0e235f" }} />
          </IconButton>
        </Tooltip>

        <AccountMenu onClick={handleLogout} />
      </div>
    </HeaderStyled>
  );
}
