/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import { useSoloGameCtx } from "@context/game/SoloGameCtx";
import { motion, AnimatePresence } from "framer-motion";
import { Typography, Button } from "@material-ui/core";
import { red, green, teal } from "@material-ui/core/colors";
import styled from "styled-components";

const PointsBox = styled.div`
  text-align: center;
  .numberBox {
    position: relative;
    height: 3rem;
  }
`;

const PointsDisplay = () => {
  const { soloState } = useSoloGameCtx();
  // const [newPoints, setNewPoints] = useState(10);
  const { points } = soloState;
  const [displayPoints, setDisplayPoints] = useState(points);
  const [goingUp, setGoingUp] = useState(true);
  useEffect(() => {
    if (points === displayPoints) return;
    if (Math.abs(points - displayPoints) > 10) {
      setDisplayPoints(points);
      return;
    }
    const interval = setInterval(() => {
      console.log("changing display points");
      if (displayPoints === points) {
        clearInterval(interval);
      }
      if (displayPoints > points) {
        setGoingUp(false);
        setDisplayPoints((old) => old - 1);
      }
      if (displayPoints < points) {
        setGoingUp(true);
        setDisplayPoints((old) => old + 1);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [points, displayPoints]);

  return (
    <PointsBox>
      <Typography variant="caption">points:</Typography>
      <div className="numberBox">
        <AnimatePresence>
          <motion.div
            custom={{ displayPoints, goingUp }}
            style={{ position: "absolute", translateX: "-50%", left: "50%" }}
            key={displayPoints}
            animate={{
              scaleY: 1,
              y: 0,
              opacity: 1,
              color: "#00000088",
              transition: {
                default: { duration: 0.2 },
                color: { duration: 2.5 },
              },
            }}
            initial={{
              scaleY: 0,
              opacity: 0,
              y: -40,
              color: goingUp ? green[500] : red[500],
            }}
            exit={({ displayPoints }) => ({
              opacity: 0,
              scaleY: 0.5,
              y: 100,
              rotate: displayPoints % 2 === 0 ? 90 : -90,
              rotateY: 90,
              transition: { duration: 0.4 },
            })}
          >
            <Typography variant="h3">{displayPoints}</Typography>
          </motion.div>
        </AnimatePresence>
      </div>
    </PointsBox>
  );
};

export default PointsDisplay;
