import { useGameCtx } from "@context/game/GameCtx";
import { Button, Typography } from "@material-ui/core";
import { ThumbDown } from "@material-ui/icons";
import { motion } from "framer-motion";
import React, { useEffect, useCallback } from "react";
import Countdown from "react-countdown";
import styled from "styled-components";

import SetCard from "../cards/SetCard";
import GameMessageOverlay from "./GameMessageOverlay";

//
//
const CardDisplay = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
`;

const NotASet: React.FC = () => {
  const { state, dispatch } = useGameCtx();
  const { failSet } = state;
  const handleClose = useCallback(() => {
    dispatch({ type: "FAIL_SET", payload: {} });
  }, [dispatch]);

  useEffect(() => {
    return handleClose;
  }, [handleClose]);

  if (!failSet) return null;

  const cardVariants = {
    visible: (i: number) => ({
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
      },
    }),
  };

  return (
    <GameMessageOverlay>
      <div>
        <Typography variant="h4">Not a set</Typography>
        <ThumbDown />
        <CardDisplay>
          {failSet.map((cardId, index) => {
            const rotations = [-10, 0, 10];
            return (
              <motion.div
                key={cardId}
                animate="visible"
                initial={{ scale: 0, y: -200 }}
                variants={cardVariants}
                custom={index}
              >
                <SetCard
                  rotation={rotations[index]}
                  cardId={cardId}
                  key={cardId}
                />
              </motion.div>
            );
          })}
        </CardDisplay>
        <Button variant="contained" color="primary" onClick={handleClose}>
          OK{" "}
          <Countdown
            date={Date.now() + 3000}
            renderer={({ seconds }) => seconds}
            onComplete={handleClose}
          />
        </Button>
      </div>
    </GameMessageOverlay>
  );
};

export default NotASet;
