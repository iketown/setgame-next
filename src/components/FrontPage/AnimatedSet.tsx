/* eslint-disable no-plusplus */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import SetCard from "../cards/SetCard";

const ThreeCards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const listOfSets = [
  ["be1d", "gf2s", "rs3r"],
  ["be2d", "rs2r", "gf2s"],
  ["rf1s", "ge2r", "bs3d"],
  ["be1s", "rs1d", "gf1r"],
  ["be1r", "ge2s", "re3d"],
  ["gs1s", "re1d", "bf1r"],
  ["rf1d", "bf2d", "gf3d"],
  ["gf3s", "be3s", "rs3s"],
  ["ge1s", "ge2s", "ge3s"],
  ["re3d", "be3d", "ge3d"],
  ["bs1r", "bf2r", "be3r"],
  ["rs3s", "bf3r", "ge3d"],
  ["ge1d", "bf2d", "rs3d"],
  ["gs1r", "bf2d", "re3s"],
  ["bs1d", "gs2d", "rs3d"],
  ["gf1d", "gf1r", "gf1s"],
  ["gs1r", "ge2r", "gf3r"],
  ["be1r", "gs2s", "rf3d"],
  ["gs1d", "gf2d", "ge3d"],
  ["bf1s", "re2r", "gs3d"],
  ["gf1s", "rs1r", "be1d"],
  ["re1r", "be2s", "ge3d"],
  ["rf2d", "rf2r", "rf2s"],
  ["ge1r", "re1s", "be1d"],
  ["bf1s", "be2r", "bs3d"],
  ["gf1s", "re2s", "bs3s"],
  ["bf1d", "bf2d", "bf3d"],
  ["rs3r", "bs3r", "gs3r"],
  ["bf1r", "bs2d", "be3s"],
  ["bs1r", "gf2r", "re3r"],
  ["gf1s", "ge2d", "gs3r"],
  ["bs1s", "bs2r", "bs3d"],
  ["gf1s", "rf2s", "bf3s"],
  ["ge1d", "rs1s", "bf1r"],
  ["be1d", "re2d", "ge3d"],
  ["ge1d", "bs2s", "rf3r"],
  ["re1s", "bf2s", "gs3s"],
  ["be1d", "gs2r", "rf3s"],
  ["rs2s", "bf2r", "ge2d"],
  ["rf1r", "rs2d", "re3s"],
];

interface AnimatedSetI {
  startIndex?: number;
  delay?: number;
  cardWidth?: number;
}

const AnimatedSet: React.FC<AnimatedSetI> = ({
  startIndex,
  delay,
  cardWidth,
}) => {
  const [setIndex, setSetIndex] = useState(startIndex || 12);
  const [set, setSet] = useState(
    listOfSets[(startIndex && startIndex + 1) || 13]
  );
  useEffect(() => {
    const getNewSet = () => {
      setSetIndex((old) => (old + 1) % listOfSets.length);
      setSet(listOfSets[setIndex]);
    };
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(getNewSet, 4000);
    }, delay || 0);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [setIndex]);
  return (
    <div>
      <ThreeCards>
        <CardList set={set} cardWidth={cardWidth} />
      </ThreeCards>
    </div>
  );
};

export default AnimatedSet;

const CardList = ({
  set,
  cardWidth = 80,
}: {
  set: string[];
  cardWidth?: number;
}) => {
  const setNum = useRef(0);
  return (
    <>
      {set.map((cardId, index) => {
        const rotations = [-5, 0, 10];
        return (
          <motion.div
            key={`${cardId}${setNum.current++}`}
            custom={index}
            initial="pre"
            animate="in"
            variants={{
              in: (i) => ({
                scale: 1,
                y: 0,
                rotate: 0,
                transition: { delay: i * 0.3 },
              }),
              pre: { scale: 0, y: -100, rotate: 90 },
            }}
          >
            <SetCard
              cardId={cardId}
              width={cardWidth}
              rotation={rotations[index]}
            />
          </motion.div>
        );
      })}
    </>
  );
};
