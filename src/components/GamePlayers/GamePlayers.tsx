import { List, Typography, Hidden, Grid } from "@material-ui/core";
import React, { useMemo } from "react";

import { motion } from "framer-motion";
import { useGameCtx } from "../../../context/game/GameCtx";
import useWidth from "../../hooks/useWidth";
import UserDisplay from "../UserSettings/UserDisplay";
import GameRequestButton from "./GameRequestButton";

interface PlayersObj {
  [uid: string]: GamePlayer;
}
interface PlayerProfiles {
  [uid: string]: PlayerProfile;
}

const GamePlayers = () => {
  const { playerProfiles, state } = useGameCtx();
  const { playedSets } = state;
  const width = useWidth();
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
  if (!usersByPoints || !usersByPoints.length) return <UserDisplay />;
  return (
    <>
      <Hidden smDown>
        <Typography variant="subtitle2" color="textSecondary">
          PLAYERS
        </Typography>
        <List>
          {usersByPoints?.map(({ uid, points }) => {
            return (
              <motion.div key={uid} layout>
                <UserDisplay userId={uid} points={points || undefined} />
              </motion.div>
            );
          })}
        </List>
      </Hidden>
      <Hidden mdUp>
        <Grid container spacing={2} style={{ marginTop: "2rem" }}>
          {usersByPoints?.map(({ uid, points }) => {
            const playerProfile = playerProfiles && playerProfiles[uid];
            return (
              <Grid item key={uid}>
                <motion.div layout>
                  <UserDisplay user={playerProfile} points={points} />
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Hidden>
      <GameRequestButton />
    </>
  );
};

export default GamePlayers;
