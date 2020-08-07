/* eslint-disable no-console */
import NotASet from "@components/GameMessages/NotASet";
import SoloGameOver from "@components/GameMessages/SoloGameOver";
import PleaseSignIn from "@components/SignIn/PleaseSignIn";
import { GameCtxProvider } from "@context/game/GameCtx";
import { SoloGameCtxProvider, useSoloGameCtx } from "@context/game/SoloGameCtx";
import { useUserCtx } from "@context/user/UserCtx";
import { useSoloGame } from "@hooks/useSoloGame";
import { Box, Button, Grid } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import GameBoard from "../GameBoard/GameBoard";
import GameTimer from "./GameTimer";
import PlayedSoloSets from "./PlayedSoloSets";
import PointsDisplay from "./PointsDisplay";

const SoloGame: React.FC = () => {
  const { query } = useRouter();
  const { user } = useUserCtx();
  const { soloDispatch } = useSoloGameCtx();
  const { handleStartGame } = useSoloGame();

  useEffect(() => {
    const gameId = query.soloGameId as string;
    soloDispatch({
      type: "SET_GAMEID",
      payload: { gameId },
    });
    handleStartGame();
  }, [query.soloGameId]);

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
          <Link href="/solo" as="/solo">
            <Button>quit game</Button>
          </Link>
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
    </Grid>
  );
};

const WrappedSoloGame: React.FC = () => {
  const { query } = useRouter();
  const soloGameId = query.soloGameId as string;
  return (
    <GameCtxProvider key={soloGameId}>
      <SoloGameCtxProvider key={soloGameId}>
        <SoloGame />
      </SoloGameCtxProvider>
    </GameCtxProvider>
  );
};

export default WrappedSoloGame;
