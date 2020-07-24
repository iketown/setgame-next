import React, { useMemo, useEffect } from "react";
import { useUserCtx } from "context/user/UserCtx";
import useWidth from "./useWidth";
import { useGameCtx } from "../../context/game/GameCtx";
import useEventListener from "./useEventListener";
import { useFBCtx } from "../../context/firebase/firebaseCtx";

export const useCards = () => {
  const {
    state: { boardCards, mySet },
    dispatch,
    gameId,
    isPlayer,
  } = useGameCtx();
  const { userProfile } = useUserCtx();
  const { functions } = useFBCtx();

  useEventListener("keydown", (e) => {
    const expandedLetters = [
      "q",
      "w",
      "e",
      "r",
      "t",
      "a",
      "s",
      "d",
      "f",
      "g",
      "z",
      "x",
      "c",
      "v",
      "b",
    ];
    if (!expandedLetters.includes(e.key)) return;
    const letters = expandedLetters.filter(
      (letter) => !["t", "g", "b"].includes(letter)
    );
    const activeLetters = row5 ? expandedLetters : letters;
    const cardIndex = activeLetters.indexOf(e.key);
    const card = boardCards[cardIndex];
    if (!card) return;

    console.log("cardIndex", cardIndex);
    // select set with keys
  });
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
  const row5 = boardCards.length > 12;

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
    if (event.metaKey || userProfile.singleClickToSelect) {
      dispatch({ type: "TOGGLE_CARD", payload: { card } });
    } else {
    }
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
