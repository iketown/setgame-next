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
import { Box, Button, Grid, Hidden } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
  const { soloDispatch, soloState } = useSoloGameCtx();
  const { handleStartGame, handleSaveGame } = useSoloGame();
  const { firestore } = useFBCtx();
  const [fullScreen, setFullScreen] = useState(false);

  const gameId = query.soloGameId as string;

  useEffect(() => {
    if (!user?.uid) return;

    const loadOrStartGame = async () => {
      //@ts-ignore
      const savedGame: SavedGame | null = await firestore
        .doc(`/users/${user.uid}/savedSoloGames/${gameId}`)
        .get()
        .then((doc) => doc.data());
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
        console.log("LOADING SAVED GAME");
        soloDispatch({ type: "LOAD_GAME", payload: { soloGameState } });
      } else {
        console.log("STARTING NEW GAME");
        handleStartGame();
      }
    };
    loadOrStartGame();
  }, [
    dispatch,
    firestore,
    gameId,
    handleStartGame,
    setIsPlayer,
    soloDispatch,
    user,
  ]);

  if (!user) return <PleaseSignIn />;

  const fullScreenProps: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    background: "white",
    width: "100%",
    margin: 0,
  };

  return (
    <Grid
      container
      style={
        fullScreen
          ? fullScreenProps
          : {
              marginTop: "1rem",
            }
      }
      spacing={2}
    >
      {/* <Hidden smUp>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            size="small"
            onClick={() => setFullScreen((old) => !old)}
            variant="outlined"
          >
            {fullScreen ? "exit" : "enter"} FULL SCREEN
          </Button>
        </Grid>
      </Hidden> */}
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
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              handleSaveGame(gameId);
            }}
          >
            Save & quit {gameId}
          </Button>
          <pre>gameId: {gameId}</pre>
          <pre>soloStateId: {soloState.gameId}</pre>
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
