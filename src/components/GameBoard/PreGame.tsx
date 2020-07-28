import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";

import useRenderCount from "@hooks/useRenderCount";
import { useGameCtx } from "../../../context/game/GameCtx";
import { useGame } from "../../hooks/useGame";
import GamePlayers from "../GamePlayers/GamePlayers";
import GameRequestsList from "../GamePlayers/GameRequestsList";
import PreGameInvitePlayers from "./PreGameInvitePlayers";

const PreGame = () => {
  useRenderCount("PreGame");
  const { startGame, deleteGame } = useGame();
  const { query, push } = useRouter();
  const { isPlayer, isGameAdmin, gameId, setGameId } = useGameCtx();
  const [allowNewPlayers, setAllowNewPlayers] = useState(true);
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
        <GamePlayers />
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
      >
        {isGameAdmin && (
          <>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={handleStart}
            >
              Start Game
            </Button>
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
            <Button onClick={handleCancel} variant="outlined" color="secondary">
              Cancel Game
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="md" style={{ height: "calc(100vh - 100px)" }}>
      {adminView}
    </Container>
  );
};

export default PreGame;
