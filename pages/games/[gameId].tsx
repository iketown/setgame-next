import GameBoard from "@components/GameBoard/GameBoard";
import PreGame from "@components/GameBoard/PreGame";
import GameOver from "@components/GameMessages/GameOver";
import NotASet from "@components/GameMessages/NotASet";
import GamePlayers from "@components/GamePlayers/GamePlayers";
import GameRequests from "@components/GamePlayers/GameRequestsList";
import Layout from "@components/layout/Layout";
import PlayedSets from "@components/PlayedSets/PlayedSets";
import { Container, Grid } from "@material-ui/core";
import React from "react";
import { NextPage } from "next";

import { GameCtxProvider, useGameCtx } from "../../context/game/GameCtx";
import { useSetListener } from "../../src/hooks/useSetListener";

//
//
const Game = () => {
  useSetListener();
  const { gameStarted } = useGameCtx();
  if (!gameStarted) return <PreGame />;
  return (
    <Layout>
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
            <GameBoard />
            <NotASet />
            <GameOver />
          </Grid>
          <Grid item xs={12} md={3}>
            <GamePlayers />
            <GameRequests />
            <PlayedSets />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

const WrappedGame: NextPage<{ origin?: string }> = ({ origin }) => {
  return (
    <div>
      <GameCtxProvider origin={origin}>
        <Game />
      </GameCtxProvider>
    </div>
  );
};

export default WrappedGame;
