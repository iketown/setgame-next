/* eslint-disable no-param-reassign */
import {
  red,
  purple,
  pink,
  indigo,
  cyan,
  green,
  orange,
  blueGrey,
} from "@material-ui/core/colors";

const playerColors = [
  { name: "grey" as PlayerColorOption, color: blueGrey },
  { name: "purple" as PlayerColorOption, color: purple },
  { name: "pink" as PlayerColorOption, color: pink },
  { name: "indigo" as PlayerColorOption, color: indigo },
  { name: "red" as PlayerColorOption, color: red },
  { name: "green" as PlayerColorOption, color: green },
  { name: "orange" as PlayerColorOption, color: orange },
  { name: "cyan" as PlayerColorOption, color: cyan },
];

const colors: PlayerColor[] = playerColors.map(({ name, color }) => ({
  name,
  light: color[50],
  med: color[400],
  dark: color[700],
}));

export const colorsObj = colors.reduce(
  (obj: { [name: string]: PlayerColor }, color) => {
    obj[color.name] = color;
    return obj;
  },
  {}
);

export default colors;
