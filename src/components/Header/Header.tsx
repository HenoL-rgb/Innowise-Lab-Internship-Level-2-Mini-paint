import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { removeUser, setQuery, setUser } from "../../store/slices/userSlice";
import AccountMenu from "../AccountMenu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, IconButton, TextField, Tooltip } from "@mui/material";
import {
  setColor,
  setFigure,
  setMode,
  setWidth,
} from "../../store/slices/figureSlice";
import { setTheme } from "../../store/slices/themeSlice";
import { HeaderStyled } from "./HeaderStyles";


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
