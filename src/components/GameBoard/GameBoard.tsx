import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, CircularProgress, Button, Typography } from "@material-ui/core";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import { useGameCtx } from "../../../context/game/GameCtx";
import { useCards } from "../../hooks/useCards";
import SetCard from "../cards/SetCard";
import GameBoardCard from "./GameBoardCard";

const GameBoard = () => {
  const { state, dispatch } = useGameCtx();
  const [specialSelect, setSpecialSelect] = useState(false);
  const { boardCards } = state;
  const {
    cardWidth,
    rowHeight,
    row5,
    margin,
    handleClickCard,
    handleShuffle,
  } = useCards();
  const noSets = state.sets && state.sets.length === 0;
  const onChange: (
    sourceId: string,
    sourceIndex: number,
    targetIndex: number,
    targetId?: string | undefined
  ) => void = (sourceId, sourceIndex, targetIndex, targetId) => {
    console.log("dragend", { sourceId, sourceIndex, targetIndex, targetId });
    if (sourceIndex === targetIndex) return;
    const nextState = swap(boardCards, sourceIndex, targetIndex);
    console.log({ boardCards, nextState });
    dispatch({ type: "UPDATE_BOARD", payload: { boardCards: nextState } });
  };

  const boxesPerRow = row5 ? 5 : 4;
  const transition = {
    // staggerChildren: 0.03,
  };
  const parentVariants = {
    selected: {
      transition,
    },
    notSelected: {
      transition,
    },
    normal: {
      // transition: { staggerChildren: 0.05 },
    },
    exit: {
      transition,
    },
  };

  return (
    <GridContextProvider onChange={onChange}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {noSets && (
            <div>
              <Typography>NO SETS!</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleShuffle}
              >
                Shuffle
              </Button>
            </div>
          )}
          <motion.div
            // variants={parentVariants}
            animate={state.cheatCards.length ? "notSelected" : "normal"}
          >
            <GridDropZone
              id="board"
              boxesPerRow={boxesPerRow}
              rowHeight={rowHeight}
              style={{
                width: `${(cardWidth + margin) * boxesPerRow}px`,
                height: `${(cardWidth * 1.4 + margin) * 3}px`,
              }}
            >
              {boardCards.map((cardId, cardIndex) => {
                return (
                  <GridItem
                    key={cardId}
                    onClick={(e) => handleClickCard(e, cardId)}
                  >
                    <GameBoardCard {...{ cardId, cardIndex }} />
                  </GridItem>
                );
              })}
            </GridDropZone>
          </motion.div>
        </Grid>
        <Grid>
          {state.sets?.sets?.map((set, i) => {
            const onClick = () => {
              set.forEach((card) => {
                dispatch({ type: "TOGGLE_CHEATER", payload: { card } });
              });
            };
            return (
              <Button {...{ onClick }} key={i}>
                cheat
              </Button>
            );
          })}
          <Button
            onClick={() => {
              dispatch({ type: "CLEAR_SET", payload: {} });
            }}
          >
            CLEAR
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setSpecialSelect((o) => !o)}
          >
            select
          </Button>
        </Grid>
      </Grid>
    </GridContextProvider>
  );
};

export default GameBoard;
