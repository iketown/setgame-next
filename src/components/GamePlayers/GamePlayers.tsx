import { usePresence } from "@hooks/usePresence";
import { Grid, Hidden, List, Typography } from "@material-ui/core";
import { motion } from "framer-motion";

import React, { useEffect, useMemo } from "react";
import { useGameCtx } from "@context/game/GameCtx";
import UserDisplay from "../UserSettings/UserDisplay";
import GameRequestButton from "./GameRequestButton";

const GamePlayers: React.FC<{
  showTitle?: boolean;
  verticalOnly?: boolean;
}> = ({ showTitle = true, verticalOnly }) => {
  const { playerProfiles, state } = useGameCtx();
  const { playedSets } = state;
  const { setPlayerIds, whosHere } = usePresence();
  const usersByPoints = useMemo(() => {
    return (
      playerProfiles &&
      Object.entries(playerProfiles)
        // get their points
        .map(([uid]) => {
          const mySets = !!playedSets && playedSets[uid];
          const points = (mySets && mySets.length * 3) || 0;
          return { uid, points };
        })
        // put them in order, most points at top
        .sort((a, b) => b.points - a.points)
    );
  }, [playedSets, playerProfiles]);

  useEffect(() => {
    if (!playerProfiles) return;
    setPlayerIds(Object.keys(playerProfiles));
  }, [playerProfiles]);
  if (!usersByPoints || !usersByPoints.length) return <UserDisplay />;
  if (verticalOnly)
    return (
      <>
        <PlayersVerticalList {...{ usersByPoints, whosHere }} />
        <GameRequestButton />
      </>
    );
  return (
    <>
      <Hidden smDown>
        {showTitle && (
          <Typography variant="subtitle2" color="textSecondary">
            PLAYERS
          </Typography>
        )}
        <PlayersVerticalList {...{ usersByPoints, whosHere }} />
      </Hidden>
      <Hidden mdUp>
        <PlayersHorizontalList {...{ usersByPoints, whosHere }} />
      </Hidden>
      <GameRequestButton />
    </>
  );
};

export default GamePlayers;

const PlayersVerticalList: React.FC<{
  usersByPoints: {
    uid: string;
    points: number;
  }[];
  whosHere: {
    [uid: string]: boolean;
  };
}> = ({ usersByPoints, whosHere }) => {
  return (
    <List>
      {usersByPoints?.map(({ uid, points }) => {
        return (
          <motion.div key={uid} layout>
            <UserDisplay
              userId={uid}
              points={points || undefined}
              isHere={whosHere && whosHere[uid]}
            />
          </motion.div>
        );
      })}
    </List>
  );
};

const PlayersHorizontalList: React.FC<{
  usersByPoints: {
    uid: string;
    points: number;
  }[];
  whosHere: {
    [uid: string]: boolean;
  };
}> = ({ usersByPoints, whosHere }) => {
  return (
    <Grid container spacing={2} style={{ marginTop: "2rem" }}>
      {usersByPoints?.map(({ uid, points }) => {
        return (
          <Grid item key={uid}>
            <motion.div layout>
              <UserDisplay
                userId={uid}
                points={points}
                isHere={whosHere && whosHere[uid]}
              />
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  );
};
