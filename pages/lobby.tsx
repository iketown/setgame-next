import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "@components/layout/Layout";
import GameList from "@components/Lobby/GameList";
import { useLobby } from "@components/Lobby/useLobby";
import { useGame } from "@hooks/useGame";
import { useRouter } from "next/router";
import Link from "next/link";
//
//
const useStyles = makeStyles((theme) => ({
  container: { paddingTop: theme.spacing(2) },
}));

const Lobby = () => {
  const classes = useStyles();
  const { push } = useRouter();
  const { findAvailableName } = useGame();
  const [isPrivate, setPrivate] = useState(false);
  const [newGameId, setNewGameId] = useState("");
  const { publicGames, uniqueName, getUniqueName } = useLobby();

  useEffect(() => {
    if (uniqueName?.name) {
      findAvailableName(uniqueName.name).then((useName) => {
        setNewGameId(useName);
      });
    }
  }, [uniqueName]);

  return (
    <main>
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <GameList />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPrivate}
                  onChange={(e, chk) => setPrivate(chk)}
                  name="checkedA"
                />
              }
              label="Private"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>{newGameId}</Typography>
            <Link href="/games/[gameId]" as={`/games/${newGameId}`}>
              <Button variant="contained" color="primary">
                create new game
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Lobby;
