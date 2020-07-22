import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useLayoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    grow: {
      flexGrow: 1,
    },
    title: {
      cursor: "pointer",
    },
  })
);

export default useLayoutStyles;
