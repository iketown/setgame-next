import CountdownToGame from "@components/GameBoard/CountdownToGame";
import GameBoard from "@components/GameBoard/GameBoard";
import GameEnded from "@components/GameBoard/GameEnded";
import GameError from "@components/GameBoard/GameError";
import PreGame from "@components/GameBoard/PreGame";
import GameOver from "@components/GameMessages/GameOver";
import NotASet from "@components/GameMessages/NotASet";
import GamePlayers from "@components/GamePlayers/GamePlayers";
import GameRequests from "@components/GamePlayers/GameRequestsList";
import PlayedSets from "@components/PlayedSets/PlayedSets";
import PleaseSignIn from "@components/SignIn/PleaseSignIn";
import { GameCtxProvider, useGameCtx } from "@context/game/GameCtx";
import { useUserCtx } from "@context/user/UserCtx";
import { useRenderCount } from "@hooks/useRenderCount";
import { useSetListener } from "@hooks/useSetListener";
import { Container, Grid } from "@material-ui/core";
import moment from "moment";
import { NextPage } from "next";
import React, { useState } from "react";

//
//
const Game = () => {
  useRenderCount("Game");
  useSetListener();
  const { gameStartTime } = useGameCtx();
  const [gameInProgress, setGameInProgress] = useState(
    !!gameStartTime && moment(gameStartTime).isBefore(moment())
  );

  return (
    <Container maxWidth="lg" fixed>
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
          {gameInProgress ? (
            <>
              <GameBoard />
              <NotASet />
              <GameOver />
            </>
          ) : (
            <CountdownToGame onCountdownEnd={() => setGameInProgress(true)} />
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <GamePlayers />
          <GameRequests />
          <PlayedSets />
        </Grid>
      </Grid>
    </Container>
  );
};

const GameOrPreGame = () => {
  useRenderCount("GameOrPreGame");
  const { gameStartTime, invalidName, gameEnded } = useGameCtx();
  const { user } = useUserCtx();
  if (!user) return <PleaseSignIn />;
  if (invalidName) return <GameError />;
  if (!gameStartTime) return <PreGame />;
  if (gameEnded) return <GameEnded />;
  return <Game />;
};

const WrappedGame: NextPage = () => {
  return (
    <GameCtxProvider>
      <GameOrPreGame />
    </GameCtxProvider>
  );
};

export default WrappedGame;
