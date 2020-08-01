import FrontPageMediaCard from "@components/FrontPage/FrontPageMediaCard";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import React from "react";

import AnimatedSet from "@components/FrontPage/AnimatedSet";

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      ike.town
      {new Date().getFullYear()}.
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  mainTitle: {
    margin: theme.spacing(2, 0),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export const Album: React.FC = () => {
  const classes = useStyles();
  const { push } = useRouter();

  return (
    <>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <AnimatedSet />
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              className={classes.mainTitle}
            >
              Set City
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              A place to connect with fellow Set Citizens.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    onClick={() => push("/lobby")}
                    variant="contained"
                    color="primary"
                  >
                    Join a Game
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Play Solo
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <FrontPageMediaCard
                image="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2304&q=80"
                imageTitle="How To Play"
                header="How To Play"
                description="The rules of the game"
                clickCardLink="/instructions"
                actions={
                  <>
                    <Link href="/instructions" as="/instructions">
                      <Button size="small" color="primary" variant="contained">
                        Go
                      </Button>
                    </Link>
                  </>
                }
              />
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
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
      {/* End footer */}
    </>
  );
};

export default Album;
