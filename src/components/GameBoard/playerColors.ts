/* eslint-disable no-param-reassign */
import {
  red,
  cyan,
  lightGreen,
  orange,
  blueGrey,
} from "@material-ui/core/colors";

const playerColors = [
  { name: "grey" as PlayerColorOption, color: blueGrey },
  { name: "red" as PlayerColorOption, color: red },
  { name: "green" as PlayerColorOption, color: lightGreen },
  { name: "orange" as PlayerColorOption, color: orange },
  { name: "cyan" as PlayerColorOption, color: cyan },
];

const colors: PlayerColor[] = playerColors.map(({ name, color }) => ({
  name,
  light: color[50],
  med: color[400],
  dark: color[600],
}));

export const colorsObj = colors.reduce(
  (obj: { [name: string]: PlayerColor }, color) => {
    obj[color.name] = color;
    return obj;
  },
  {}
);

export default colors;
