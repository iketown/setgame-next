/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable spaced-comment */
/* eslint-disable no-console */
import NotASet from "@components/GameMessages/NotASet";
import SoloGameOver from "@components/GameMessages/SoloGameOver";
import PleaseSignIn from "@components/SignIn/PleaseSignIn";
import { GameCtxProvider, useGameCtx } from "@context/game/GameCtx";
import { SoloGameCtxProvider, useSoloGameCtx } from "@context/game/SoloGameCtx";
import { useUserCtx } from "@context/user/UserCtx";
import { useSoloGame } from "@hooks/useSoloGame";
import { Box, Button, Grid } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { getSets } from "@utils/checkCards";
import GameBoard from "../GameBoard/GameBoard";
import GameTimer from "./GameTimer";
import PlayedSoloSets from "./PlayedSoloSets";
import PointsDisplay from "./PointsDisplay";

const SoloGame: React.FC = () => {
  const { query } = useRouter();
  const { user } = useUserCtx();
  const { dispatch, setIsPlayer } = useGameCtx();
  const { soloDispatch } = useSoloGameCtx();
  const { handleStartGame, handleSaveGame } = useSoloGame();
  const { firestore } = useFBCtx();
  useEffect(() => {
    if (!user?.uid) return null;
    const gameId = query.soloGameId as string;
    soloDispatch({
      type: "SET_GAMEID",
      payload: { gameId },
    });
    const loadOrStartGame = async () => {
      //@ts-ignore
      const savedGame: SavedGame | null = await firestore
        .doc(`/users/${user.uid}/savedSoloGames/${gameId}`)
        .get()
        .then((doc) => doc.data());
      console.log("savedGame", savedGame);
      if (savedGame) {
        const { gameState, ...soloGameState } = savedGame;
        setIsPlayer(true);
        const sets = getSets(gameState.boardCards) || [];

        dispatch({
          type: "UPDATE_BOARD",
          payload: {
            boardCards: gameState.boardCards,
            deckCards: gameState.deckCards,
            sets: { length: sets.length, sets },
          },
        });
        soloDispatch({ type: "LOAD_GAME", payload: { soloGameState } });
      } else {
        handleStartGame();
      }
    };
    loadOrStartGame();
  }, [query.soloGameId, user]);

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
            <Button
              style={{ marginRight: "1rem" }}
              variant="outlined"
              color="secondary"
            >
              quit
            </Button>
          </Link>
          <Button variant="outlined" color="primary" onClick={handleSaveGame}>
            Save & quit
          </Button>
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
