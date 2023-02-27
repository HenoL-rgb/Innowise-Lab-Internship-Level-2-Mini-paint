import * as React from "react";
import { Box, Switch } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { setTheme } from "../store/slices/themeSlice";

type AccountMenuProps = {
  onClick: () => void;
  theme: any;
};
export default function AccountMenu({ onClick, theme }: AccountMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);
  const email = useAppSelector((state) => state.user.email);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    setAnchorEl(null);
    onClick();
  }

  function handleChangeTheme(e: any) {
    dispatch(setTheme(e.target.checked ? "dark" : "light"));
  }
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, backgroundColor: "#3dd3e2" }}>
              {email.slice(0,1).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            bgcolor: theme.header.bg,
            color: theme.header.font,
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: theme.header.bg,
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <span>{email}</span>
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LightModeIcon />
          <Switch
            onChange={handleChangeTheme}
            checked={currentTheme === "dark" ? true : false}
          />
          <DarkModeIcon />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout sx={{color: theme.header.font}} fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
