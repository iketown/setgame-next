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
import { useUserCtx } from "@context/user/UserCtx";
import { getUniqueName } from "../src/utils/getUniqueName";
import { useFBCtx } from "../src/context/firebase/firebaseCtx";
import PleaseSignIn from "../src/components/SignIn/PleaseSignIn";
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
  const { user } = useUserCtx();
  const { createPendingGame } = useGame();
  const { db } = useFBCtx();
  const [newGameId, setNewGameId] = useState("");
  const { myGames } = useLobbyCtx();
  const changeGameId = () => {
    setNewGameId(getUniqueName());
  };
  useEffect(() => {
    if (!newGameId) {
      setNewGameId(getUniqueName());
    }
    db.ref(`games/${newGameId}`)
      .once("value")
      .then((snap) => {
        if (snap.exists()) {
          changeGameId();
        }
      });
  }, [newGameId, db]);
  const imAvailable = !myGames || myGames?.length < 2;
  if (!user) return <PleaseSignIn />;
  return (
    <main className={classes.root}>
      <Container fixed maxWidth="md" className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardActions>
                {imAvailable && (
                  <Link href="/games/[gameId]" as={`/games/${newGameId}`}>
                    <Button
                      onClick={() => createPendingGame(newGameId)}
                      variant="contained"
                      color="primary"
                    >
                      create new game
                    </Button>
                  </Link>
                )}
                {imAvailable && !!newGameId && (
                  <Typography
                    onClick={changeGameId}
                    variant="caption"
                    color="textSecondary"
                    style={{ cursor: "pointer", marginTop: "5px" }}
                    noWrap
                  >
                    {newGameId}
                  </Typography>
                )}
              </CardActions>
              <GameList />
            </Card>
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
