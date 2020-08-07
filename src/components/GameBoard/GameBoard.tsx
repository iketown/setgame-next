/* eslint-disable no-console */
import React from "react";
import { Grid } from "@material-ui/core";
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
  } = useCards();
  const { showShortcuts, activeLetters } = useKeyboardListener();

  const onChange: (
    sourceId: string,
    sourceIndex: number,
    targetIndex: number,
    targetId?: string | undefined
  ) => void = (sourceId, sourceIndex, targetIndex, targetId) => {
    console.log("dragend", {
      sourceId,
      sourceIndex,
      targetIndex,
      targetId,
    });
    if (sourceIndex === targetIndex) {
      return;
    }
    const nextState = swap(boardCards, sourceIndex, targetIndex);
    console.log({ boardCards, nextState });
    dispatch({ type: "CLEAR_SET", payload: {} });
    dispatch({ type: "REARRANGE_BOARD", payload: { boardCards: nextState } });
  };

  const boxesPerRow = row5 ? 5 : 4;

  return (
    <GridContextProvider onChange={onChange}>
      <Grid container spacing={2}>
        <CheatButtons />
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
                  id={cardId}
                  onMouseDownCapture={(e) => handleClickCard(e, cardId)}
                  onDoubleClick={() => handleDoubleClick(cardId)}
                >
                  <GameBoardCard
                    {...{ cardId, cardIndex }}
                    overlay={
                      showShortcuts ? (
                        <div
                          style={{
                            position: "absolute",
                            top: 5,
                            left: 10,
                            zIndex: 1,
                          }}
                        >
                          {activeLetters[cardIndex]}
                        </div>
                      ) : null
                    }
                  />
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
