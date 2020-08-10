import React from "react";
import AnimatedSet from "@components/FrontPage/AnimatedSet";
import { Grid, Typography, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
//
//
const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundColor: theme.palette.background.paper,
    // position: "relative",
    backgroundImage: "url(/images/city_bg.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "right",
  },
  heroContent: {
    padding: theme.spacing(8, 4, 4),
  },
  mainTitle: {
    margin: theme.spacing(2, 0),
    fontFamily: `Luckiest Guy, sans-serif`,
  },
  centered: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <Container className={classes.hero}>
      <Grid container spacing={2} className={classes.heroContent}>
        <Grid item xs={12} sm={6} className={classes.centered}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            className={classes.mainTitle}
          >
            Set
            <span
              style={{
                opacity: 0.5,
                fontSize: "2.5rem",
                margin: "0 3px",
              }}
            >
              .
            </span>
            City
          </Typography>
          <div>
            <Link href="/howtoplay" as="/howtoplay">
              <Button variant="outlined">How to Play</Button>
            </Link>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedSet />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;
