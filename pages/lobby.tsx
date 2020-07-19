import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { useGame } from "../src/hooks/useGame";
//
//
const Lobby = () => {
  const { createGame } = useGame();
  // start here for a game
  // list of people looking for a game
  const handleStartGame = () => {
    createGame();
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle1">the lobby</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" color="primary" onClick={handleStartGame}>
          create game
        </Button>
      </Grid>
    </Grid>
  );
};

export default Lobby;
