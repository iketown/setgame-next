/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useUserProfiles } from "@hooks/useUserProfiles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  ListSubheader,
  Typography,
  Card,
} from "@material-ui/core";
import moment from "moment";
import FaceDrawing from "../faces/FaceDrawing";
//
//
const HighScores: React.FC = () => {
  const [highScores, setHighScores] = useState([]);
  const { setUserIds, userProfiles } = useUserProfiles();
  const { db } = useFBCtx();

  useEffect(() => {
    if (!db) return;
    const hsRef = db.ref(`highScores`);

    hsRef.on("value", (snap) => {
      if (snap.exists()) {
        const hs: {
          [gameId: string]: { date: string; playerId: string; points: number };
        } = snap.val();
        const sortedHS =
          hs &&
          Object.entries(hs).sort(
            ([idA, objA], [idB, objB]) => objB.points - objA.points
          );
        setUserIds(sortedHS.map(([gameId, obj]) => obj.playerId));
        setHighScores(sortedHS);
      }
    });
    return () => hsRef.off("value");
  }, []);
  return (
    <Card>
      <List>
        <ListSubheader>High Scores</ListSubheader>
        {highScores?.map(([gameId, { date, playerId, points }]) => {
          const profile = userProfiles && userProfiles[playerId];
          const faceImageNumber = profile?.faceImageNumber;
          const displayName = profile?.displayName;
          const location = profile?.location;
          return (
            <ListItem
              dense
              key={gameId}
              style={{ maxHeight: "60vh", overflow: "scroll" }}
            >
              <ListItemAvatar>
                <FaceDrawing faceImageNumber={faceImageNumber} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div>
                    <Typography variant="h5" display="inline">
                      {points}
                    </Typography>
                    <Typography
                      style={{ marginLeft: "5px" }}
                      noWrap
                      color="textSecondary"
                      display="inline"
                    >
                      {displayName}
                    </Typography>
                  </div>
                }
                secondary={`${moment(date).fromNow()} ${
                  location ? ` • ${location}` : ""
                }`}
              />
            </ListItem>
          );
        })}
      </List>
      {/* <pre>{JSON.stringify(highScores, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(userProfiles, null, 2)}</pre> */}
    </Card>
  );
};

export default HighScores;
