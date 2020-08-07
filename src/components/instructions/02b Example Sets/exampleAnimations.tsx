import { motion, Variants } from "framer-motion";
import React from "react";

const allVariants: Variants = {
  in: (i) => ({
    x: 0,
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i },
  }),
};
const leftVariants: Variants = {
  ...allVariants,
  initial: { x: -100, opacity: 0 },
};
const rightVariants: Variants = {
  ...allVariants,
  initial: { x: 100, opacity: 0 },
};

export const AnimatedEntrance: React.FC<{ left?: boolean; unique: string }> = ({
  children,
  left,
  unique,
}) => {
  return (
    <motion.div
      key={unique}
      variants={left ? leftVariants : rightVariants}
      custom={left ? 0.5 : 1}
      animate="in"
      initial="initial"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedEntrance;
