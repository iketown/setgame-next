import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//
//

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()} ike.town
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 4, 2),
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography
        variant="caption"
        align="center"
        color="textSecondary"
        component="p"
      >
        We are not affiliated, associated, authorized, endorsed by, or in any
        way officially connected with <u>Set Enterprises, Inc</u>.<br /> The
        official SetGame website can be found at{" "}
        <a href="https://www.setgame.com/" target="_blank" rel="noreferrer">
          setgame.com
        </a>
      </Typography>
      <Copyright />
    </footer>
  );
};

export default Footer;
