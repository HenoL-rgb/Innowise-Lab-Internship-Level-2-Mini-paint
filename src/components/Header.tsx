import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../hooks/redux-hooks";
import { removeUser, setUser } from "../store/slices/userSlice";
import AccountMenu from "./AccountMenu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton, Tooltip } from "@mui/material";

export const HeaderStyled = styled.div`
  position: relative;
  display: flex;
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

  function handleLogout() {
    dispatch(removeUser());
    localStorage.removeItem("userInfo");
  }

  function handleToDrawPage() {
    navigate("/draw");
  }

  return (
    <HeaderStyled>
      <h2>
        <Link to="/">Mini-paint</Link>
      </h2>
      <div>
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
