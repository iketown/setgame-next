import { createMuiTheme } from "@material-ui/core/styles";
import { teal, pink } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: pink,
  },
  typography: {
    h5: {
      fontSize: "1.2rem",
      fontFamily: "Roboto Condensed",
      fontWeight: "400",
    },
    h6: {
      fontSize: "1.5rem",
      fontFamily: "Roboto Condensed",
      fontWeight: "700",
    },
  },
});

export default theme;
