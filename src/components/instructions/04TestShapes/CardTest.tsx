/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import SetCard from "@components/cards/SetCard";
import { Box, Grid } from "@material-ui/core";
import { AnimateSharedLayout, motion, Variants } from "framer-motion";
import React, { useState } from "react";
import { FaThumbsUp, FaTimesCircle } from "react-icons/fa";
import styled from "styled-components";

import { FullLine, P } from "../typographyElements";
import { popCardVariants } from "../utils/cardVariants";

//
//

const DottedContainer = styled(motion.div)<{
  cardWidth: number;
  success: boolean;
  fail: boolean;
}>`
  position: relative;
  border: 3px dotted
    ${(p) => (p.success ? "green" : p.fail ? "red" : "lightgray")};
  background: ${(p) =>
    p.success ? "#00800014" : p.fail ? "#ff000014" : "none"};
  transition: 0.5s background;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  justify-items: center;
  padding: 2rem;
  border-radius: 1rem;
  width: ${(p) => p.cardWidth * 4}px;
  .questioncard {
    border: 3px dotted lightgray;
    width: ${(p) => p.cardWidth}px;
    color: lightgray;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 5rem;
    }
  }
  .responseicon {
    position: absolute;
    top: 50%;
    right: -4rem;
    transform: translateY(-50%);
  }
  .failmessage {
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
  }
`;

export const testCardVariants: Variants = {
  initial: { x: 50, y: -100, rotate: 90, opacity: 0 },
  in: (i) => ({
    x: 0,
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: { delay: 0.5 + i * 0.3 },
  }),
  exit: { y: 100, opacity: 0 },
};

const questionSpaceVariant: Variants = {
  initial: { opacity: 0.5, scale: 0 },
  in: { opacity: 1, scale: 1, transition: { delay: 0.4 } },
};

interface CardTestProps {
  tests: CardTestI[];
  onTestIsDone: () => void;
}

interface CardTestI {
  testCards: string[];
  answerCards: string[];
  correctAnswer: string;
  failMessages: { [failCard: string]: JSX.Element | string };
}

const CardTest: React.FC<CardTestProps> = ({ tests, onTestIsDone }) => {
  const [testIndex, setTestIndex] = useState(0);

  const { testCards, answerCards, correctAnswer, failMessages } = tests[
    testIndex
  ];

  const cardWidth = 160;
  const [selectedCard, setSelectedCard] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const handleReset = () => {
    setSuccess(false);
    setFail(false);
    setSelectedCard("");
  };
  const handleSuccess = () => {
    setFail(false);
    setSuccess(true);
    setTimeout(() => {
      setTestIndex((old: number) => {
        const nextIndex = old + 1;
        if (nextIndex >= tests.length) {
          onTestIsDone();
          return old;
        }
        handleReset();
        return nextIndex;
      });
    }, 1500);
  };
  const handleFail = () => {
    setSuccess(false);
    setFail(true);
  };

  const setAndCheck = (answer: string) => {
    setSelectedCard(answer);
    if (answer === correctAnswer) handleSuccess();
    else handleFail();
  };

  return (
    <AnimateSharedLayout>
      <Grid container>
        <FullLine center>
          <P>Click the third card to complete the set</P>
        </FullLine>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <DottedContainer
              cardWidth={cardWidth}
              // variants={containerVariants}
              animate="in"
              {...{ success, fail }}
            >
              {fail && (
                <div className="failmessage">
                  {failMessages[selectedCard] || failMessages.all}
                </div>
              )}
              {(success || fail) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: "50%" }}
                  animate={{
                    opacity: 1,
                    scale: 1.2,
                    y: "-50%",
                    transition: { bounceDamping: 3 },
                  }}
                  className="responseicon"
                >
                  {success ? (
                    <FaThumbsUp size="3rem" color="green" />
                  ) : (
                    <FaTimesCircle size="3rem" color="red" />
                  )}
                </motion.div>
              )}

              {testCards.map((cardId, i) => {
                return (
                  <motion.div
                    key={`${cardId}${i}${testIndex}`}
                    variants={popCardVariants}
                    initial="initial"
                    custom={i}
                  >
                    <SetCard width={cardWidth} cardId={cardId} />
                  </motion.div>
                );
              })}

              <motion.div
                key={testIndex}
                initial="initial"
                variants={questionSpaceVariant}
                className="questioncard"
              >
                {selectedCard ? (
                  <motion.div
                    onClick={handleReset}
                    layoutId={selectedCard}
                    key={selectedCard}
                  >
                    <SetCard width={cardWidth} cardId={selectedCard} />
                  </motion.div>
                ) : (
                  <span>?</span>
                )}
              </motion.div>
            </DottedContainer>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Box
              justifyContent="space-around"
              display="flex"
              width={cardWidth * 4}
              marginTop="2rem"
            >
              {answerCards.map((cardId) => {
                if (cardId === selectedCard) return null;
                return (
                  <motion.div
                    key={cardId}
                    layoutId={cardId}
                    onClick={() => setAndCheck(cardId)}
                    style={{
                      // border: "1px solid orange",
                      width: cardWidth,
                    }}
                  >
                    <SetCard width={cardWidth} cardId={cardId} />
                  </motion.div>
                );
              })}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </AnimateSharedLayout>
  );
};

export default CardTest;
