/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import FaceDrawing from "@components/faces/FaceDrawing";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import { motion } from "framer-motion";
import { Card } from "@material-ui/core";
import { useGameCtx } from "../../../context/game/GameCtx";
import SetCard from "../cards/SetCard";
import { colorsObj } from "../GameBoard/playerColors";

const StyledLi = styled(Card)<{ backgroundColor: string; borderColor: string }>`
  background: ${(p) => p.backgroundColor};
  position: relative;
  height: 3rem;
  width: 15rem;
  border-radius: 10px;
  border: 1px solid ${(p) => p.borderColor};
  display: flex;
  padding: 3px;
  margin-bottom: 25px;
  overflow: unset;
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

const PlayedSetListItem: React.FC<PlayedSetListItemI> = ({
  time,
  uid,
  set,
}) => {
  const { playerProfiles } = useGameCtx();
  const liRef = useRef(null);
  useEffect(() => {
    // liRef.current?.scrollIntoView({
    //   behavior: "smooth",
    //   block: "nearest",
    //   inline: "start",
    // });
  }, []);
  const player = playerProfiles && playerProfiles[uid];
  const color = (player?.userColor && colorsObj[player.userColor]) || {
    light: "lightgray",
    med: "gray",
  };
  return (
    <motion.div ref={liRef} initial={{ x: "100%" }} animate={{ x: 0 }}>
      <StyledLi backgroundColor={color.light} borderColor={color.med}>
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
                <SetCard
                  key={cardId}
                  {...{ width, rotation }}
                  cardId={cardId}
                />
              );
            })}
        </div>
      </StyledLi>
    </motion.div>
  );
};

export default PlayedSetListItem;
