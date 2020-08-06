import { useGameCtx } from "@context/game/GameCtx";
import { Typography, Button } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import styled from "styled-components";

import useSoloGame from "@hooks/useSoloGame";
import GameMessageOverlay from "./GameMessageOverlay";

const PlayerFinalList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SoloGameOver: React.FC = () => {
  const { gameOver, setGameOver } = useGameCtx();
  const { handleStartGame } = useSoloGame();
  const [showGameOver, setShowGameOver] = useState(false); // allows for a couple seconds before showing game over screen
  const delayShowGameOver = () => {
    setTimeout(() => {
      setShowGameOver(true);
    }, 1000);
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
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => {
              setGameOver(false);
              handleStartGame();
            }}
          >
            Play Again
          </Button>
        </PlayerFinalList>
      </motion.div>
    </GameMessageOverlay>
  );
};

export default SoloGameOver;
