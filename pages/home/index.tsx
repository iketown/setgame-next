import CreateNewGameButton from "@components/home/CreateNewGameButton";
import CurrentGames from "@components/home/CurrentGames";
import Footer from "@components/home/Footer";
import Header from "@components/home/Header";
import HighScores from "@components/SoloGame/HighScores";
import SavedSoloGames from "@components/SoloGame/SavedSoloGames";
import StartSoloGameButton from "@components/SoloGame/StartSoloGameButton";
import { useGame } from "@hooks/useGame";
import { Container, Grid, Typography, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import RecentFinishedGames from "@components/home/RecentFinishedGames";

const useStyles = makeStyles((theme) => ({
  mainArea: {
    flex: "1 0 auto",
    backgroundImage: "url(/images/shapesBG.svg)",
    backgroundSize: "4rem",
    backgroundAttachment: "fixed",
  },
  body: {
    display: "flex",
    height: "calc(100vh - 4rem)",
    flexDirection: "column",
  },
  container: {
    margin: theme.spacing(4, "auto"),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    flexShrink: 0,
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
}));

const HomePage: React.FC = () => {
  const classes = useStyles();
  const { wakeUpFxn } = useGame();
  useEffect(() => {
    wakeUpFxn(["createGame"]);
  }, []);
  return (
    <div className={classes.body}>
      <main className={classes.mainArea}>
        <Header />
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={2}>
            <Hidden mdUp>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <WithFriendsButton />
                <SoloButton />
              </div>
            </Hidden>

            <Grid item xs={12} md={6}>
              <Hidden smDown>
                <WithFriendsButton />
              </Hidden>

              <CurrentGames />
              <RecentFinishedGames />
            </Grid>
            <Grid item xs={12} md={6}>
              <Hidden smDown>
                <SoloButton />
              </Hidden>
              <HighScores />
              <SavedSoloGames />
            </Grid>
          </Grid>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

const WithFriendsButton = () => {
  const classes = useStyles();
  return (
    <div className={classes.buttonDiv}>
      <Typography variant="subtitle1" color="textSecondary">
        WITH FRIENDS:
      </Typography>
      <div>
        <CreateNewGameButton />
      </div>
    </div>
  );
};

const SoloButton = () => {
  const classes = useStyles();
  return (
    <div className={classes.buttonDiv}>
      <Typography variant="subtitle1" color="textSecondary">
        SOLO:
      </Typography>
      <div>
        <StartSoloGameButton />
      </div>
    </div>
  );
};
