/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useUserCtx } from "@context/user/UserCtx";
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaTrash, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useSoloGame } from "@hooks/useSoloGame";

const SavedSoloGames: React.FC = () => {
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
  }, [user]);

  if (!user?.uid) return null;
  return (
    <>
      <List>
        <ListSubheader>Games in Progress</ListSubheader>
        {savedGames.map(({ gameId, points, latestSetTime, gameState }) => {
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
    </>
  );
};

export default SavedSoloGames;
