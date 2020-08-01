import React, { useRef, useEffect, useState } from "react";
import {
  AnimateSharedLayout,
  AnimatePresence,
  motion,
  Variants,
} from "framer-motion";
import { Typography } from "@material-ui/core";
import useComponentSize from "@rehooks/component-size";

const wordVariants: Variants = {
  in: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
    scale: 1,
    fontSize: 10,
  },
  initial: {
    opacity: 0,
    fontSize: 15,
    marginLeft: 10,
    y: -15,
    scale: 0,
    position: "relative",
  },
  exit: {
    opacity: 0,
    position: "absolute",
    transition: { duration: 0.5 },
  },
};

const AnimatedSentence: React.FC<{ cardId: string }> = ({ cardId }) => {
  const attrWords = {
    shape: { d: "diamond", r: "round", s: "squiggle" },
    color: { r: "red", g: "green", b: "purple" },
    fill: { f: "full", e: "empty", s: "striped" },
    num: { "1": "one", "2": "two", "3": "three" },
  };

  const [color, fill, num, shape] = cardId.split("");
  const colorWord = attrWords.color[color];
  const fillWord = attrWords.fill[fill];
  const numWord = attrWords.num[num];
  const shapeWord = attrWords.shape[shape] + (num !== "1" ? "s" : "");

  return (
    <div>
      <AnimatePresence>
        <motion.span
          initial="initial"
          animate="in"
          exit="exit"
          key={numWord}
          variants={wordVariants}
        >
          <Typography display="inline">{numWord}</Typography>
        </motion.span>
        <motion.span
          initial="initial"
          animate="in"
          exit="exit"
          key={fillWord}
          variants={wordVariants}
        >
          <Typography display="inline">{fillWord}</Typography>
        </motion.span>
        <motion.span
          initial="initial"
          animate="in"
          exit="exit"
          key={colorWord}
          variants={wordVariants}
        >
          <Typography display="inline">{colorWord}</Typography>
        </motion.span>
        <motion.span
          initial="initial"
          animate="in"
          exit="exit"
          key={shapeWord.slice(0, 4)}
          variants={wordVariants}
        >
          <Typography display="inline">{shapeWord}</Typography>
        </motion.span>
        {/* <AnimatedWord word={numWord} />
        <AnimatedWord word={fillWord} />
        <AnimatedWord word={colorWord} />
        <AnimatedWord word={shapeWord} /> */}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSentence;

const AnimatedWord: React.FC<{ word: string }> = ({ word }) => {
  return (
    <motion.span
      key={word}
      style={{
        // textAlign: "center",
        // border: "1px solid blue",
        marginLeft: "1rem",
      }}
      exit="exit"
      animate="in"
      variants={wordVariants}
    >
      <Typography display="inline">{word}</Typography>
    </motion.span>
  );
};
