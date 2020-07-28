import React, { useMemo } from "react";
import { useGameCtx } from "context/game/GameCtx";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { motion } from "framer-motion";
import GameMessageOverlay from "./GameMessageOverlay";
import UserDisplay from "../UserSettings/UserDisplay";

const PlayerFinalList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameOver = () => {
  const { gameOver, state, playerProfiles } = useGameCtx();
  const { playedSets } = state;
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
  if (!gameOver) return null;
  return (
    <GameMessageOverlay>
      <PlayerFinalList>
        <Typography variant="h3" gutterBottom>
          GAME OVER
        </Typography>
        {usersByPoints?.map(({ uid, points }, index) => {
          const user = playerProfiles && playerProfiles[uid];
          if (index === 0) {
            return (
              <motion.div
                animate={{
                  scale: [0.95, 1.05],
                  transition: { yoyo: Infinity, duration: 0.3 },
                }}
              >
                <UserDisplay key={uid} points={points} userId={uid} />
              </motion.div>
            );
          }
          return <UserDisplay key={uid} points={points} userId={uid} />;
        })}
      </PlayerFinalList>
    </GameMessageOverlay>
  );
};

export default GameOver;
