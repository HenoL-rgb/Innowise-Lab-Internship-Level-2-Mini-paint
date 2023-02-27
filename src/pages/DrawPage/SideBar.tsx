import { Box, Button, ButtonGroup, IconButton } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import CreateIcon from "@mui/icons-material/Create";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setColor, setFigure, setMode } from "../../store/slices/figureSlice";
import FormatPaintOutlinedIcon from '@mui/icons-material/FormatPaintOutlined';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import Popover from "@mui/material/Popover/Popover";
import WidthSlider from "../../components/WidthSlider";
import SaveDialog from "../../components/SaveDialog";

const SideBarStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  span {
    width: min-content;
  }
  button {
    margin-top: 15px;
  }
  input[name="colorPick"] {
    background-color: transparent;
    outline-color: transparent;
    border: 1px solid #3f5dab;
    width: 50px;
    height: 30px;
    border-radius: 5px;
    padding: 1px;
    cursor: pointer;
  }
`;

const buttons = [
  {
    key: "pencil",
    icon: <CreateOutlinedIcon />,
    checkedIcon: <CreateIcon />,
  },
  {
    key: "line",
    icon: <RemoveOutlinedIcon />,
    checkedIcon: <HorizontalRuleIcon />,
  },
  {
    key: "circle",
    icon: <CircleOutlinedIcon />,
    checkedIcon: <CircleIcon />,
  },
  {
    key: "rectangle",
    icon: <CropSquareIcon />,
    checkedIcon: <SquareRoundedIcon />,
  },
];

type SideBarProps = {
  handleClearClick: () => void;
  handleSave: (title: string) => void
};

export default function SideBar({ handleClearClick, handleSave }: SideBarProps) {
  const shape = useAppSelector((state) => state.figure);
  const dispatch = useAppDispatch();

  function handleClick(e: any) {
    dispatch(setFigure(e.target.name));
  }

  function handleClear() {
    handleClearClick();
  }

  function handleColor(e: any) {
    dispatch(setColor(e.target.value))
  }

  function handleMode(e: any) {
    dispatch(setMode(e.target.checked ? 'fill' : 'outline'))
  }

  return (
    <SideBarStyled>
      {buttons.map((button) => (
        <Checkbox
          sx={{ color: "#3f5dab" }}
          key={button.key}
          name={button.key}
          icon={button.icon}
          checkedIcon={button.checkedIcon}
          checked={shape.figure === button.key}
          onClick={handleClick}
        />
      ))}
      <Checkbox
          sx={{ color: "#3f5dab" }}
          icon={<FormatPaintOutlinedIcon />}
          checkedIcon={<FormatPaintIcon />}
          checked={shape.mode === 'fill'}
          onClick={handleMode}
        />
      <input name="colorPick" type="color" onChange={handleColor} value={shape.color} />
      <WidthSlider />
      <Button key="clear" onClick={handleClear}>
        Clear
      </Button>
      <SaveDialog handleSave={handleSave} />
    </SideBarStyled>
  );
}
