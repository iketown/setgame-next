import { useGameCtx } from "@context/game/GameCtx";
import { Typography } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";

import RematchSimple from "../GameBoard/RematchSimple";
import GameMessageOverlay from "./GameMessageOverlay";

const PlayerFinalList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameOver: React.FC = () => {
  const { gameOver } = useGameCtx();
  const [showGameOver, setShowGameOver] = useState(false); // allows for a couple seconds before showing game over screen
  const delayShowGameOver = () => {
    setTimeout(() => {
      setShowGameOver(true);
    }, 3000);
  };

  if (!gameOver) return null;
  if (gameOver && !showGameOver) {
    delayShowGameOver();
    return null;
  }

  return (
    <GameMessageOverlay>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 0.5 } }}
      >
        <PlayerFinalList>
          <Typography variant="h3" gutterBottom>
            GAME OVER
          </Typography>
        </PlayerFinalList>
        <RematchSimple />
      </motion.div>
    </GameMessageOverlay>
  );
};

export default GameOver;
