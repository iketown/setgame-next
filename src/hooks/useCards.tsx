/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useMemo } from "react";
import { useGameCtx } from "@context/game/GameCtx";
import { useFBCtx } from "@context/firebase/firebaseCtx";
import useWidth from "./useWidth";

export const useCards = () => {
  const {
    state: { boardCards },
    dispatch,
    gameId,
    isPlayer,
  } = useGameCtx();
  const { functions } = useFBCtx();
  const row5 = boardCards.length > 12;

  const width = useWidth();
  const cardWidth = useMemo(() => {
    switch (width) {
      case "xs":
        return 80;
      case "sm":
        return 100;
      case "md":
      case "lg":
      case "xl":
        return 110;
      default:
        return 100;
    }
  }, [width]);
  const margin = 15;
  const rowHeight = cardWidth * 1.4 + margin;

  const handleClickCard = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    card: string
  ) => {
    if (!isPlayer) {
      dispatch({
        type: "SET_MESSAGE",
        payload: {
          message: {
            type: "NOT_A_PLAYER",
            message: `You're not currently playing.  please Request To Join `,
          },
        },
      });
      return;
    }
    // if (event.metaKey || userProfile.singleClickToSelect) {
    dispatch({ type: "TOGGLE_CARD", payload: { card } });
    // }
  };
  const handleDoubleClick = (card: string) => {
    dispatch({ type: "TOGGLE_CARD", payload: { card } });
  };

  const handleShuffle = () => {
    const shuffle = functions.httpsCallable("shuffle");
    shuffle({ gameId });
  };

  return {
    cardWidth,
    rowHeight,
    row5,
    margin,
    handleClickCard,
    handleDoubleClick,
    handleShuffle,
  };
};

export default useCards;
