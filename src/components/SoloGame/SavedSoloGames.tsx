/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useUserCtx } from "@context/user/UserCtx";
import { useSoloGame } from "@hooks/useSoloGame";
import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaTrash } from "react-icons/fa";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginTop: theme.spacing(2),
  },
}));

const SavedSoloGames: React.FC = () => {
  const classes = useStyles();
  const { firestore } = useFBCtx();
  const { deleteSavedGame } = useSoloGame();
  const [savedGames, setSavedGames] = useState<SavedGame[]>([]);
  const { user } = useUserCtx();
  useEffect(() => {
    if (!user?.uid) return;
    const savedGamesRef = firestore.collection(
      `users/${user.uid}/savedSoloGames`
    );
    const unsubscribe = savedGamesRef.onSnapshot((snap) => {
      const _savedGames: SavedGame[] = [];
      snap.forEach((doc) => {
        // @ts-ignore
        _savedGames.push(doc.data());
      });
      setSavedGames(_savedGames);
    });
    return unsubscribe;
  }, [firestore, user]);

  if (!user?.uid) return null;
  if (!savedGames?.length) return null;
  return (
    <Card className={classes.card}>
      <List>
        <ListSubheader>MY SOLO GAMES</ListSubheader>
        {savedGames?.map(({ gameId, points, latestSetTime, gameState }) => {
          return (
            <ListItem divider dense key={gameId}>
              <ListItemAvatar>
                <Link href="/solo/[soloGameId]" as={`/solo/${gameId}`}>
                  <IconButton color="primary">
                    <FaArrowRight />
                  </IconButton>
                </Link>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div>
                    <Typography display="inline" variant="body1">
                      {points}
                    </Typography>{" "}
                    <Typography display="inline" variant="caption">
                      points
                    </Typography>{" "}
                    <Typography display="inline" variant="body1">
                      {gameState.deckCards.length}
                    </Typography>{" "}
                    <Typography display="inline" variant="caption">
                      cards left
                    </Typography>{" "}
                  </div>
                }
                secondary={moment(latestSetTime).fromNow()}
              />
              <ListItemSecondaryAction>
                <IconButton
                  size="small"
                  onClick={() => deleteSavedGame(gameId)}
                >
                  <FaTrash />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      {/* <pre>{JSON.stringify(savedGames, null, 2)}</pre> */}
    </Card>
  );
};

export default SavedSoloGames;
