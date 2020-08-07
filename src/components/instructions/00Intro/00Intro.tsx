/* eslint-disable no-nested-ternary */
import SetCard from "@components/cards/SetCard";
import { Button, Grid, Box, Typography } from "@material-ui/core";
import { motion, Variants } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { FullLine, NextButton, P } from "../typographyElements";

const StyledCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  width: ${80 * 4 + 5 * 10}px;
`;

const parentVariants: Variants = {
  in: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const cardVar: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  cardIn: {
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
  selected: {
    scale: 1.1,
    opacity: 1,
    rotate: 0,
  },
  unselected: {
    scale: 0.8,
    opacity: 0.5,
    rotate: -3,
  },
};

const exampleBoard = [
  "rf1r",
  "gs2d",
  "ge2s",
  "re3d",
  "gs1r",
  "rs3d",
  "rf2r",
  "be3d",
  "rf3r",
  "bf2s",
  "be2r",
  "gf2r",
];

const sets = [
  ["rf1r", "rf2r", "rf3r"],
  ["gs2d", "gf2r", "ge2s"],
  ["gs1r", "bf2s", "re3d"],
];

const Intro: React.FC<{ advance: () => void }> = ({ advance }) => {
  const [showSetIndex, setShowSetIndex] = useState<number>(2);
  const setShowing = showSetIndex >= 0;
  const shownSet = (setShowing && sets[showSetIndex]) || [];
  const handleSetButton = (index: number) => {
    setShowSetIndex((old) => (old === index ? -1 : index));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSetIndex((old) => (old + 1) % sets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Grid
      item
      xs={12}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FullLine center>
        <motion.div animate="in" variants={parentVariants}>
          <P from="right">
            A game of Set starts with 12 cards face-up on the table.
          </P>
          <P from="left">
            Each player's goal is to find a three-card{" "}
            <b>
              <em>set</em>
            </b>
          </P>
          <P from="bottom">
            <Typography component="span" color="textSecondary">
              we'll talk about what makes a set in a minute
            </Typography>
          </P>
        </motion.div>
      </FullLine>
      <Box marginTop="2rem" />

      <StyledCardGrid>
        {exampleBoard.map((cardId, index) => {
          const isSelected = setShowing && shownSet.includes(cardId);
          const isUnselected = setShowing && !shownSet.includes(cardId);
          const animate = isSelected
            ? "selected"
            : isUnselected
            ? "unselected"
            : "cardIn";
          return (
            <motion.div
              custom={index}
              key={cardId}
              initial="initial"
              animate={animate}
              variants={cardVar}
            >
              <SetCard
                width={80}
                {...{ cardId }}
                border={isSelected ? "1px solid grey" : ""}
              />
            </motion.div>
          );
        })}
      </StyledCardGrid>
      <Box marginTop="2rem" />
      <div style={{ display: "flex" }}>
        {sets.map((set, i) => (
          <Button
            style={{ margin: "1rem" }}
            variant={i === showSetIndex ? "outlined" : "text"}
            color="primary"
            onClick={() => handleSetButton(i)}
            key={set.join("")}
          >
            set {i + 1}
          </Button>
        ))}
      </div>
      <div style={{ marginTop: "2rem" }} />
      <NextButton onClick={advance} />
    </Grid>
  );
};

export default Intro;
