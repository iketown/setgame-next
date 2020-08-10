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

import GamePlayers from "../GamePlayers/GamePlayers";
import GameRequestsList from "../GamePlayers/GameRequestsList";

const PreGame: React.FC = () => {
  useRenderCount("PreGame");
  const { startGame, deleteGame, wakeUpFxn } = useGame();
  const { push } = useRouter();
  const { isGameAdmin, gameId } = useGameCtx();

  const handleStart = () => {
    startGame();
  };
  const handleCancel = async () => {
    push("/home").then(() => deleteGame(gameId));
  };
  useEffect(() => {
    wakeUpFxn(["submitSet", "createRematch", "deleteGame"]);
  }, []);

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
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {isGameAdmin && (
          <div style={{ marginBottom: "3rem" }}>
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
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      />
    </Grid>
  );

  return (
    <Container maxWidth="md" style={{ height: "calc(100vh - 100px)" }}>
      {adminView}
    </Container>
  );
};

export default PreGame;
