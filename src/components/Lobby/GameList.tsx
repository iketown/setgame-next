import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Typography,
  IconButton,
} from "@material-ui/core";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import moment from "moment";
import { useLobby } from "./useLobby";
import FaceDrawing from "../faces/FaceDrawing";

const GameList = () => {
  const { publicGames } = useLobby();
  const gamesByStartTime =
    publicGames &&
    Object.entries(publicGames).sort(([gameId, obj], [gameId2, obj2]) => {
      if (moment(obj.startedAt).isBefore(moment(obj2.startedAt))) return 1;
      return -1;
    });
  return (
    <List dense>
      <pre>{JSON.stringify(publicGames, null, 2)}</pre>
      {gamesByStartTime &&
        gamesByStartTime.map(([gameId, obj]) => {
          const { players, gameStarted, startedAt } = obj;
          return (
            <Link href="/games/[gameId]" as={`/games/${gameId}`} key={gameId}>
              <ListItem button dense>
                <ListItemText
                  primary={<Typography>{gameId}</Typography>}
                  secondary={
                    <Typography
                      component="span"
                      variant="caption"
                      color="textSecondary"
                    >{`${moment(startedAt).fromNow()}`}</Typography>
                  }
                />
                <div style={{ display: "flex", marginRight: "1rem" }}>
                  <FaceDrawing height="40px" faceImageNumber={12} />
                  <FaceDrawing height="40px" faceImageNumber={31} />
                  <FaceDrawing height="40px" faceImageNumber={19} />
                  <FaceDrawing height="40px" faceImageNumber={5} />
                </div>
                <ListItemSecondaryAction>
                  <IconButton size="small">
                    <FaArrowAltCircleRight />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          );
        })}
    </List>
  );
};

export default GameList;
