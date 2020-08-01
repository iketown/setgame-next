import { useGameCtx } from "@context/game/GameCtx";
import { useGame } from "@hooks/useGame";
import { useRenderCount } from "@hooks/useRenderCount";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";

import GamePlayers from "../GamePlayers/GamePlayers";
import GameRequestsList from "../GamePlayers/GameRequestsList";
import PreGameInvitePlayers from "./PreGameInvitePlayers";

const PreGame: React.FC = () => {
  useRenderCount("PreGame");
  const { startGame, deleteGame } = useGame();
  const { push } = useRouter();
  const { isGameAdmin, gameId } = useGameCtx();
  const [allowNewPlayers, setAllowNewPlayers] = useState(false);
  const handleStart = () => {
    startGame(allowNewPlayers);
  };
  const handleCancel = async () => {
    push("/lobby").then(() => deleteGame(gameId));
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
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <div>{isGameAdmin && <PreGameInvitePlayers />}</div>
      </Grid>

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
            <GamePlayers showTitle={false} />
            {isGameAdmin && (
              <FormControlLabel
                label="allow new players after start"
                labelPlacement="start"
                control={
                  <Checkbox
                    checked={allowNewPlayers}
                    onChange={(e, chk) => {
                      setAllowNewPlayers(chk);
                    }}
                  />
                }
              />
            )}
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
