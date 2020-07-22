import React from "react";
import { useField, useForm } from "react-final-form";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
} from "@material-ui/core";
import colors, { colorsObj } from "../GameBoard/playerColors";
import UserDisplay from "./UserDisplay";

const ColorPicker = () => {
  const { input, meta } = useField("userColor");
  const { getState } = useForm();
  const { values } = getState();
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Color</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={input.value}
        onChange={(e) => input.onChange(e.target.value)}
      >
        {colors.map((color) => {
          return (
            <MenuItem key={color.name} value={color.name}>
              <Avatar
                style={{ background: colorsObj[color.name || "grey"].med }}
              />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ColorPicker;
