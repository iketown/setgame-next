import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { GridItem } from "react-grid-dnd";
import SetCard from "../cards/SetCard";
import { useGameCtx } from "../../../context/game/GameCtx";
import { useCards } from "../../hooks/useCards";

//
//
const cardVariants: Variants = {
  selected: { scale: 1.05 },
  notSelected: { scale: 0.95 },
  shrunk: { scale: 0, rotate: 45, y: -100, x: 100 },
  normal: (i) => ({
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
};

const GameBoardCard = ({
  cardId,
  cardIndex,
  handleClick,
}: {
  cardId: string;
  cardIndex: number;
  handleClick?: any;
}) => {
  const { state } = useGameCtx();
  const isSelected = state.mySet.includes(cardId);
  const isCheater = state.cheatCards.includes(cardId);
  const newIndex = state.newCards.findIndex((c) => c === cardId);
  const isNew = newIndex >= 0;
  const { cardWidth } = useCards();
  return (
    <motion.div
      key={cardId}
      initial="shrunk"
      animate={isCheater ? "selected" : undefined}
      custom={newIndex}
      variants={cardVariants}
    >
      <SetCard {...{ cardId, isSelected, isCheater }} width={cardWidth} />
    </motion.div>
  );
};

export default GameBoardCard;
