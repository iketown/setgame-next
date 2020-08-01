import { AnimatePresence, motion, Variants } from "framer-motion";
import React from "react";
import SetCard from "@components/cards/SetCard";

const cardVariants: Variants = {
  in: (i) => ({
    zIndex: 2,
    opacity: 1,
    rotate: i,
    x: 0,
    y: 0,
    transition: { stiffness: 40 },
  }),
  initial: { opacity: 0, rotate: 20, x: 100, y: -100 },
  exit: {
    zIndex: 1,
    opacity: 0,
    transition: { duration: 2 },
  },
};

export const AnimatedCardPile = ({ cardId }: { cardId: string }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 150,
          height: 220,
        }}
      >
        <AnimatePresence>
          <motion.div
            custom={Math.floor(Math.random() * 10 - 5)}
            style={{ position: "absolute" }}
            key={cardId}
            variants={cardVariants}
            initial="initial"
            animate="in"
            exit="exit"
          >
            <SetCard width={150} cardId={cardId} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedCardPile;
