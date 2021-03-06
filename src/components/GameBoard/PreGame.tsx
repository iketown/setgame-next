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
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUserCtx } from "@context/user/UserCtx";
import CopyGameUrl from "./CopyGameUrl";
import ChatBox from "../GameMessages/ChatBox";
import GamePlayers from "../GamePlayers/GamePlayers";
import GameRequestsList from "../GamePlayers/GameRequestsList";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    maxWidth: "35rem",
    width: "90vw",
  },
}));

const PreGame: React.FC = () => {
  const classes = useStyles();
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
  }, [user, setLocation]);
  const handleCancel = async () => {
    push("/").then(() => deleteGame(gameId));
  };
  useEffect(() => {
    wakeUpFxn(["submitSet", "createRematch", "deleteGame"]);
  }, [wakeUpFxn]);
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
        <Card className={classes.card}>
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
              <CopyGameUrl />
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
