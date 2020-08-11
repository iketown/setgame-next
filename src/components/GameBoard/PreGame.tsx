import { useGameCtx } from "@context/game/GameCtx";
import { useGame } from "@hooks/useGame";
import { useRenderCount } from "@hooks/useRenderCount";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useUserCtx } from "@context/user/UserCtx";
import ChatBox from "../GameMessages/ChatBox";
import GamePlayers from "../GamePlayers/GamePlayers";
import GameRequestsList from "../GamePlayers/GameRequestsList";

const PreGame: React.FC = () => {
  useRenderCount("PreGame");
  const { startGame, deleteGame, wakeUpFxn } = useGame();
  const { push } = useRouter();
  const { isGameAdmin, gameId } = useGameCtx();
  const { setLocation, user } = useUserCtx();
  const handleStart = () => {
    startGame();
  };
  useEffect(() => {
    if (!user) return;
    setLocation();
  }, [user]);
  const handleCancel = async () => {
    push("/").then(() => deleteGame(gameId));
  };
  useEffect(() => {
    wakeUpFxn(["submitSet", "createRematch", "deleteGame"]);
  }, []);
  const centeredGridItem: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  const adminView = (
    <Grid
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
      container
    >
      <Grid item xs={12} style={centeredGridItem}>
        {isGameAdmin && (
          <div style={{ margin: "3rem" }}>
            <GameRequestsList />
          </div>
        )}
        <Card style={{ width: "25rem" }}>
          <CardHeader title="Players" />
          <CardContent
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <GamePlayers showTitle={false} verticalOnly />
          </CardContent>

          {isGameAdmin && (
            <CardActions style={{ justifyContent: "space-between" }}>
              <Button
                onClick={handleCancel}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={handleStart}
              >
                Start Game
              </Button>
            </CardActions>
          )}
        </Card>
      </Grid>
      <Grid style={centeredGridItem} item xs={12}>
        <ChatBox />
      </Grid>
    </Grid>
  );

  return <Container maxWidth="md">{adminView}</Container>;
};

export default PreGame;
