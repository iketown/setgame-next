import React from "react";
import { useField } from "react-final-form";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import colors, { colorsObj } from "../GameBoard/playerColors";

const ColorPicker: React.FC = () => {
  const { input } = useField("userColor");
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
              <div
                style={{
                  background: colorsObj[color.name || "grey"].med,
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                }}
              />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ColorPicker;
