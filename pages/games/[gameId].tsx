import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";

import { GameCtxProvider, useGameCtx } from "../../context/game/GameCtx";
import GameBoard from "../../src/components/GameBoard/GameBoard";
import GamePlayers from "../../src/components/GamePlayers/GamePlayers";
import GameRequests from "../../src/components/GamePlayers/GameRequests";
import Layout from "../../src/components/layout/Layout";
import { useSetListener } from "../../src/hooks/useSetListener";
import useWidth from "../../src/hooks/useWidth";

//
//
const Game = () => {
  const width = useWidth();
  const { state } = useGameCtx();
  useSetListener();
  // if (state.message?.type === "NO_GAME_FOUND") return <div>no game found</div>;

  return (
    <Layout>
      <Container maxWidth="md" fixed>
        <Grid
          container
          style={{ marginTop: "1rem", border: "1px dotted orange" }}
        >
          <Grid item xs={12} sm={9} style={{ textAlign: "center" }}>
            <GameBoard />
            <Typography variant="body2">
              cards in deck: {state.deckCards.length}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <GamePlayers />
            <GameRequests />
            {/* <pre>{JSON.stringify(state.newCards, null, 1)}</pre> */}
            {/* <pre>{JSON.stringify(state.successSet, null, 1)}</pre> */}
            {/* <UserScreen /> */}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

const WrappedGame = () => {
  return (
    <GameCtxProvider>
      <Game />
    </GameCtxProvider>
  );
};

export default WrappedGame;
