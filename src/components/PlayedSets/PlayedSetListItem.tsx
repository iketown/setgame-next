/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import FaceDrawing from "@components/faces/FaceDrawing";
import { useGameCtx } from "@context/game/GameCtx";
import { Card } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import SetCard from "../cards/SetCard";
import { colorsObj } from "../GameBoard/playerColors";

const StyledLi = styled.div<{ background: string; border: string }>`
  background: ${(p) => p.background};
  position: relative;
  height: 3rem;
  width: 15rem;
  border-radius: 10px;
  border: ${(p) => p.border};
  display: flex;
  padding: 3px;
  margin-bottom: 25px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

  /* overflow: unset; */
  .face {
  }
  .cards {
    transform: scale(0.8);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card {
      margin-left: 3px;
    }
  }
`;

interface PlayedSetListItemI {
  time: string;
  uid: string;
  set: string[];
  index: number;
}
const width = 60;
const rotation = 0;

const PlayedSetListItem: React.FC<PlayedSetListItemI> = ({ uid, set }) => {
  const { playerProfiles } = useGameCtx();
  const liRef = useRef(null);

  const player = playerProfiles && playerProfiles[uid];
  const color = (player?.userColor && colorsObj[player.userColor]) || {
    light: "lightgray",
    med: "gray",
  };
  return (
    <motion.div ref={liRef} initial={{ x: "100%" }} animate={{ x: 0 }}>
      <StyledLi background={color.light} border={`1px solid ${color.med}`}>
        <div className="face">
          <FaceDrawing
            height="40px"
            faceImageNumber={player?.faceImageNumber}
          />
        </div>
        <div className="cards">
          {set
            // in order from 1 -> 3
            .sort((a, b) => Number(a.charAt(2)) - Number(b.charAt(2)))
            .map((cardId) => {
              return (
                <div key={cardId}>
                  <SetCard {...{ width, rotation }} cardId={cardId} />
                </div>
              );
            })}
        </div>
      </StyledLi>
    </motion.div>
  );
};

export default PlayedSetListItem;
