import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useUserProfiles } from "@hooks/useUserProfiles";
import { Typography } from "@material-ui/core";
import FaceDrawing from "../faces/FaceDrawing";
import { colorsObj } from "../GameBoard/playerColors";

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: "flex",
    padding: theme.spacing(0, 2),
  },
  playerBox: {
    flexGrow: 1,
    padding: theme.spacing(0.5),
    border: "1px solid lightgrey",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(0.5),
  },
  playerBoxGrid: {
    display: "grid",
    gridTemplateColumns: "max-content max-content",
    gridTemplateRows: "max-content max-content",
    alignItems: "center",
  },
  pointsDiv: {
    padding: theme.spacing(1),
  },
}));
const RecentGameListItem: React.FC<{ recentGame: RecentGame }> = ({
  recentGame,
}) => {
  const classes = useStyles();
  const { setUserIds, userProfiles } = useUserProfiles();
  const inOrder = Object.entries(recentGame.scores).sort((a, b) => b[1] - a[1]);

  useEffect(() => {
    const { scores } = recentGame;
    setUserIds(Object.keys(scores));
  }, [recentGame]);

  return (
    <div className={classes.listItem}>
      {inOrder.map(([userId, points], index) => {
        const profile = userProfiles && userProfiles[userId];
        const faceImageNumber = profile && profile.faceImageNumber;
        const userColor =
          (colorsObj[profile?.userColor] &&
            colorsObj[profile?.userColor].med) ||
          "lightgrey";
        return (
          <div
            key={userId}
            className={`${classes.playerBox}`}
            style={{
              boxShadow: index === 0 ? `0 0 8px 0px ${userColor}` : "",
            }}
          >
            <div className={classes.playerBoxGrid}>
              <div style={{ gridArea: "1 / 1 " }}>
                <FaceDrawing {...{ faceImageNumber }} />
              </div>

              <Typography
                style={{ gridArea: "1 / 2 " }}
                variant="h5"
                className={classes.pointsDiv}
              >
                {points}
              </Typography>
              <Typography
                variant="caption"
                noWrap
                style={{ gridArea: "2 / 1 / 2 / -1", textAlign: "center" }}
              >
                {profile?.displayName}
              </Typography>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentGameListItem;
