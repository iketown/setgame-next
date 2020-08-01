import { Variants } from "framer-motion";

export const cardVariants: Variants = {
  initial: { opacity: 0, y: -100, rotate: 15 },
  in: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.5 },
  },
  exit: { opacity: 0, y: 50, rotate: -15, transition: { duration: 0.5 } },
};

export default cardVariants;
