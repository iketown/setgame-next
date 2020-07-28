import { usePresence } from "@hooks/usePresence";
import { Grid, Hidden, List, Typography } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useEffect, useMemo } from "react";
import { useUserCtx } from "../../../context/user/UserCtx";
import { useGameCtx } from "../../../context/game/GameCtx";
import UserDisplay from "../UserSettings/UserDisplay";
import GameRequestButton from "./GameRequestButton";

interface PlayersObj {
  [uid: string]: GamePlayer;
}
interface PlayerProfiles {
  [uid: string]: PlayerProfile;
}

const GamePlayers = ({ showTitle = true }) => {
  const { playerProfiles, state } = useGameCtx();
  const { user } = useUserCtx();
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
  return (
    <>
      <Hidden smDown>
        {showTitle && (
          <Typography variant="subtitle2" color="textSecondary">
            PLAYERS
          </Typography>
        )}
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
      </Hidden>
      <Hidden mdUp>
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
      </Hidden>
      <GameRequestButton />
      {/* <pre>{JSON.stringify(whosHere, null, 2)}</pre> */}
    </>
  );
};

export default GamePlayers;
