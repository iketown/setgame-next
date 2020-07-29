import { useProfile } from "@hooks/useProfile";
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import Link from "next/link";
import React from "react";

import FaceDrawing from "../faces/FaceDrawing";

//
//
interface GameListItemI {
  gameId: string;
  players: {
    [uid: string]: {
      joinedAt: string;
      playerProfile: { displayName: string; faceImageNumber?: number };
    };
  };
  gameStartTime: false | string; // when play begins
  createdAt: string; // game was created
}

const GameListItem: React.FC<GameListItemI> = ({
  gameId,
  players,
  gameStartTime,
}) => {
  const whenText = gameStartTime
    ? `started ${moment(gameStartTime).fromNow()}`
    : "not yet started";
  return (
    <Link href="/games/[gameId]" as={`/games/${gameId}`} key={gameId}>
      <ListItem button dense divider>
        <ListItemText
          primary={<Typography>{gameId}</Typography>}
          secondary={
            <Typography
              component="span"
              variant="caption"
              color="textSecondary"
            >
              {whenText}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <div
            style={{
              display: "flex",
              marginRight: "1rem",
              justifyContent: "flex-end",
            }}
          >
            {players &&
              Object.entries(players).map(([uid]) => {
                return <PlayerHead key={uid} uid={uid} />;
              })}
          </div>
        </ListItemSecondaryAction>
      </ListItem>
    </Link>
  );
};

export default GameListItem;

const PlayerHead = ({ uid }: { uid: string }) => {
  const { profile } = useProfile(uid);
  const displayName = profile?.displayName;
  const faceImageNumber = profile?.faceImageNumber;
  return (
    <Tooltip title={displayName || "player"} key={uid} placement="top">
      <div>
        <FaceDrawing height="40px" faceImageNumber={faceImageNumber} />
      </div>
    </Tooltip>
  );
};
