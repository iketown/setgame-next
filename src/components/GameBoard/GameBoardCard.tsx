import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { GridItem } from "react-grid-dnd";
import FaceDrawing from "@components/faces/FaceDrawing";
import SetCard from "../cards/SetCard";
import { useGameCtx } from "../../../context/game/GameCtx";
import { useCards } from "../../hooks/useCards";
import { colorsObj } from "./playerColors";
//
//
const cardVariants: Variants = {
  selected: { scale: 1.05, rotate: 4 },
  notSelected: { scale: 0.9 },
  shrunk: { scale: 0, rotate: 45, y: -100, x: 100 },
  success: {
    scale: 1.15,
    // transition: { duration: .5 },
  },
  exit: {
    background: "red",
  },
  new: (i) => ({
    scale: 1.0,
    rotate: 0,
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 130,
      delay: i * 0.1,
    },
  }),
  normal: (i) => ({
    scale: 1.0,
    rotate: 0,
    y: 0,
    x: 0,
    // transition: {
    //   type: "spring",
    //   damping: 15,
    //   stiffness: 130,
    //   delay: i * 0.1,
    // },
  }),
};

const GameBoardCard: React.FC<{ cardId: string }> = ({ cardId }) => {
  const { state, playerProfiles } = useGameCtx();
  const successPlayerId = state.successSet?.uid;

  const successColorString =
    (successPlayerId &&
      playerProfiles &&
      playerProfiles[successPlayerId].userColor) ||
    "grey";
  const successImageNumber =
    successPlayerId &&
    playerProfiles &&
    playerProfiles[successPlayerId].faceImageNumber
      ? playerProfiles[successPlayerId].faceImageNumber
      : null;

  const successColor = colorsObj[successColorString].med;
  const newIndex = state.newCards.findIndex((c) => c === cardId);
  const { cardWidth } = useCards();
  const defaultBorder = "1px solid rgba(0, 0, 0, 0.1)";
  const getCardState = () => {
    switch (true) {
      case state.successSet?.set?.includes(cardId):
        return {
          animationVariant: "success",
          border: `2px solid ${successColor}`,
          faceImageNumber: successImageNumber,
        };
      case !!state.successSet: {
        return { animationVariant: "notSelected", border: defaultBorder };
      }
      case state.cheatCards.includes(cardId):
      case state.mySet.includes(cardId):
        return {
          animationVariant: "selected",
          border: "1px solid blue",
          rotation: 5,
        };
      case !!state.cheatCards.length:
        return { animationVariant: "notSelected", border: defaultBorder };
      case state.newCards.includes(cardId):
        return { animationVariant: "new", border: defaultBorder };
      default:
        return { animationVariant: "normal", border: defaultBorder };
    }
  };
  const {
    animationVariant,
    border,
    faceImageNumber,
    rotation,
  } = getCardState();
  return (
    <motion.div
      key={cardId}
      initial="shrunk"
      animate={animationVariant}
      custom={newIndex}
      variants={cardVariants}
      style={{ position: "relative" }}
    >
      {faceImageNumber && (
        <FaceDrawing
          faceImageNumber={faceImageNumber}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 10,
          }}
        />
      )}
      <SetCard {...{ cardId, border }} width={cardWidth} />
    </motion.div>
  );
};

export default GameBoardCard;
