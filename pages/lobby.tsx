import GameList from "@components/Lobby/GameList";
import { LobbyCtxProvider, useLobbyCtx } from "@context/lobby/LobbyCtx";
import { useGame } from "@hooks/useGame";
import {
  Button,
  Card,
  CardActions,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import getUniqueName from "../src/utils/getUniqueName";

//
//
const useStyles = makeStyles((theme) => ({
  container: { paddingTop: theme.spacing(2) },
  root: {
    backgroundImage: `url(/images/LobbyImage1000.jpg)`,
    backgroundSize: "cover",
    height: "100vh",
    backgroundPosition: "right",
  },
}));

const Lobby = () => {
  const classes = useStyles();
  const { createPendingGame } = useGame();
  const [newGameId, setNewGameId] = useState("");

  useEffect(() => {
    if (!newGameId) {
      setNewGameId(getUniqueName());
    }
  }, [newGameId]);

  return (
    <main className={classes.root}>
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <GameList />
              <CardActions>
                <Link href="/games/[gameId]" as={`/games/${newGameId}`}>
                  <Button
                    onClick={() => createPendingGame(newGameId)}
                    variant="contained"
                    color="primary"
                  >
                    create new game
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Typography>{newGameId}</Typography>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

const WrappedLobby: React.FC = () => {
  return (
    <LobbyCtxProvider>
      <Lobby />
    </LobbyCtxProvider>
  );
};
export default WrappedLobby;
