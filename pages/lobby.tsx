import React, { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import Layout from "@components/layout/Layout";
import { useGame } from "../src/hooks/useGame";
//
//
const Lobby = () => {
  const { createGame } = useGame();
  const [isPrivate, setPrivate] = useState(false);
  // start here for a game
  // list of people looking for a game
  const handleStartGame = () => {
    createGame(isPrivate);
  };
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">the lobby</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" onClick={handleStartGame}>
            create game
          </Button>
          <FormControlLabel
            control={
              <Checkbox
                checked={isPrivate}
                onChange={(e, chk) => setPrivate(chk)}
                name="checkedA"
              />
            }
            label="Private"
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Lobby;
