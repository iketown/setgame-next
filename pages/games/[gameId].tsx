import CountdownToGame from "@components/GameBoard/CountdownToGame";
import GameBoard from "@components/GameBoard/GameBoard";
import GameEnded from "@components/GameBoard/GameEnded";
import PreGame from "@components/GameBoard/PreGame";
import GameOver from "@components/GameMessages/GameOver";
import NotASet from "@components/GameMessages/NotASet";
import GamePlayers from "@components/GamePlayers/GamePlayers";
import GameRequests from "@components/GamePlayers/GameRequestsList";
import PlayedSets from "@components/PlayedSets/PlayedSets";
import PleaseSignIn from "@components/SignIn/PleaseSignIn";
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { GameCtxProvider, useGameCtx } from "@context/game/GameCtx";
import { useUserCtx } from "@context/user/UserCtx";
import { useRenderCount } from "@hooks/useRenderCount";
import { useSetListener } from "@hooks/useSetListener";
import { Container, Grid, Hidden } from "@material-ui/core";
import moment from "moment";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import ChatBox from "../../src/components/GameMessages/ChatBox";

//
//
const Game = () => {
  useRenderCount("Game");
  const { query } = useRouter();
  const { functions } = useFBCtx();
  const submitSetApi = useCallback(
    ({ mySet }: { mySet: string[] }) => {
      const { gameId } = query;
      const submitSet = functions.httpsCallable("submitSet");
      return submitSet({ mySet, gameId });
    },
    [query, functions]
  );
  useSetListener({ submitSetApi });
  const { gameStartTime } = useGameCtx();
  const [gameInProgress, setGameInProgress] = useState(
    !!gameStartTime && moment(gameStartTime).isBefore(moment())
  );

  return (
    <Container maxWidth="lg" fixed>
      <Grid
        container
        style={{
          marginTop: "1rem",
        }}
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
            // textAlign: "center",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {gameInProgress ? (
            <>
              <GameBoard key={`${query.gameId}GameBoard`} />
              <NotASet key={`${query.gameId}NotASet`} />
              <GameOver key={`${query.gameId}GameOver`} />
            </>
          ) : (
            <CountdownToGame onCountdownEnd={() => setGameInProgress(true)} />
          )}
          <Hidden smDown>
            <ChatBox />
          </Hidden>
        </Grid>
        <Grid container item xs={12} md={3} alignContent="flex-start">
          <Grid item xs={12} sm={6} md={12}>
            <GamePlayers verticalOnly />
            <GameRequests />
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <PlayedSets />
          </Grid>
          <Hidden mdUp>
            <Grid item xs={12}>
              <ChatBox />
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
};

const GameOrPreGame = () => {
  useRenderCount("GameOrPreGame");
  const { gameStartTime, gameEnded } = useGameCtx();

  const { user } = useUserCtx();
  if (!user) return <PleaseSignIn />;
  if (gameEnded) return <GameEnded />;
  if (!gameStartTime) return <PreGame />;
  return <Game />;
};

const WrappedGame: NextPage = () => {
  const { query } = useRouter();

  return (
    <GameCtxProvider key={`${query.gameId as string}ctxprovider`}>
      <GameOrPreGame />
    </GameCtxProvider>
  );
};

export default WrappedGame;
