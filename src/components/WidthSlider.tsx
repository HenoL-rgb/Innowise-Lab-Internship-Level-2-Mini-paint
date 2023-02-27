import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Slider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { setWidth } from "../store/slices/figureSlice";

export default function WidthSlider() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const value = useAppSelector(state => state.figure.width)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleChange(e: any) {
    dispatch(setWidth(e.target.value))
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {value}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <Box width={50}>
            <Slider
              size="small"
              defaultValue={value}
              aria-label="Default"
              valueLabelDisplay="auto"
              min={1}
              max={20}
              onChange={handleChange}
            />
          </Box>
        </MenuItem>
      </Menu>
    </div>
  );
}
