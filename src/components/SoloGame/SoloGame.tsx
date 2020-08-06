import React, { useState } from "react";
import { GameCtxProvider, useGameCtx } from "@context/game/GameCtx";
import { useRouter } from "next/router";
import { useUserCtx } from "@context/user/UserCtx";
import { useSoloGameCtx, SoloGameCtxProvider } from "@context/game/SoloGameCtx";
import PleaseSignIn from "@components/SignIn/PleaseSignIn";
import { useSoloGame } from "@hooks/useSoloGame";
import { Button, Grid, Box } from "@material-ui/core";
import NotASet from "@components/GameMessages/NotASet";
import SoloGameOver from "@components/GameMessages/SoloGameOver";
import moment from "moment";
import GameBoard from "../GameBoard/GameBoard";
import GameTimer from "./GameTimer";
import PointsDisplay from "./PointsDisplay";
import PlayedSoloSets from "./PlayedSoloSets";

const SoloGame = () => {
  const { user } = useUserCtx();
  const { setGameOver, gameOver } = useGameCtx();
  const { handleStartGame } = useSoloGame();
  const { soloState } = useSoloGameCtx();
  const gameInProgess = soloState.sets.length > 0;

  if (!user) return <PleaseSignIn />;
  return (
    <Grid container style={{ marginTop: "1rem" }} spacing={2}>
      <Grid
        item
        xs={12}
        md={9}
        style={{
          textAlign: "center",
          position: "relative",
        }}
      >
        <GameBoard />
        <NotASet />
        <SoloGameOver />
        <Box marginTop="2rem">
          {gameInProgess ? (
            <Button onClick={() => setGameOver(moment().format())}>
              quit game
            </Button>
          ) : (
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={handleStartGame}
            >
              START GAME
            </Button>
          )}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <GameTimer onCountdownEnd={() => console.log("countdown end")} />
        <Box marginTop="1rem">
          <PointsDisplay />
        </Box>
        <PlayedSoloSets />
      </Grid>
      <Grid item xs={12}>
        <pre>{JSON.stringify(soloState, null, 2)}</pre>
      </Grid>
    </Grid>
  );
};

const WrappedSoloGame = () => {
  const router = useRouter();

  return (
    <GameCtxProvider>
      <SoloGameCtxProvider>
        <SoloGame />
      </SoloGameCtxProvider>
    </GameCtxProvider>
  );
};

export default WrappedSoloGame;
