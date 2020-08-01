import { Variants } from "framer-motion";

export const textVariants: Variants = {
  left: { x: "-100px", opacity: 0 },
  right: { x: "100px", opacity: 0 },
  top: { y: "-100px", opacity: 0 },
  bottom: { y: "100px", opacity: 0 },
  in: { x: 0, y: 0, opacity: 1 },
  exit: { opacity: 0 },
};

export const foo = "bar";
