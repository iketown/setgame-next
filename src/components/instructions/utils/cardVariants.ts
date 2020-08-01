/* eslint-disable import/prefer-default-export */
import { Variants } from "framer-motion";

export const cardVariants: Variants = {
  initial: { opacity: 0 },
  in: (i) => ({
    opacity: 1,
    transition: { delay: i * 0.1 },
  }),
  exit: { opacity: 0, transition: { delay: 0.5 } },
};

export const popCardVariants: Variants = {
  initial: { scale: 0, opacity: 0, y: -100 },
  in: (i) => ({
    y: 0,
    scale: 1,
    opacity: 1,
    transition: { delay: i * 0.1 },
  }),
  exit: { scale: 0, opacity: 0 },
};
