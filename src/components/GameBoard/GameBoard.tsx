/* eslint-disable no-console */
import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import { useCards } from "@hooks/useCards";
import { useKeyboardListener } from "@hooks/useKeyboardListener";
import { useGameCtx } from "@context/game/GameCtx";
import GameBoardCard from "./GameBoardCard";
import CheatButtons from "./CheatButtons";
import GameProgressLine from "./GameProgressLine";

const GameBoard: React.FC = () => {
  const { state, dispatch } = useGameCtx();
  const { boardCards } = state;
  const {
    cardWidth,
    rowHeight,
    row5,
    margin,
    handleClickCard,
    handleDoubleClick,
    handleShuffle,
  } = useCards();
  useKeyboardListener();
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
    dispatch({ type: "REARRANGE_BOARD", payload: { boardCards: nextState } });
  };

  const boxesPerRow = row5 ? 5 : 4;

  return (
    <GridContextProvider onChange={onChange}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CheatButtons />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
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
                  onDoubleClick={() => handleDoubleClick(cardId)}
                >
                  <GameBoardCard {...{ cardId, cardIndex }} />
                </GridItem>
              );
            })}
          </GridDropZone>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <GameProgressLine cardsLeft={state.deckCards.length} />
        </Grid>
      </Grid>
    </GridContextProvider>
  );
};

export default GameBoard;
