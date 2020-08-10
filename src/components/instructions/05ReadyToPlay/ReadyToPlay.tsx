import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";
import StartSoloGameButton from "@components/SoloGame/StartSoloGameButton";
import CreateNewGameButton from "@components/home/CreateNewGameButton";
import CurrentGames from "@components/home/CurrentGames";

const useStyles = makeStyles((theme) => ({
  column: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  actionButton: {
    margin: theme.spacing(3),
  },
}));

const ReadyToPlay: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Box marginTop="2rem" />
        <Typography variant="h3">CONGRATULATIONS!</Typography>
        <Typography variant="h4" color="textSecondary">
          Ready to play ?
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} className={classes.column}>
        <Typography variant="h6" color="textSecondary">
          WITH FRIENDS:
        </Typography>
        <div className={classes.actionButton}>
          <CreateNewGameButton />
        </div>
        <CurrentGames />
      </Grid>
      <Grid item xs={12} md={6} className={classes.column}>
        <Typography variant="h6" color="textSecondary">
          SOLO:
        </Typography>
        <div className={classes.actionButton}>
          <StartSoloGameButton />
        </div>
      </Grid>
    </Grid>
  );
};

export default ReadyToPlay;
