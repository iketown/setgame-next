/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useGameCtx } from "@context/game/GameCtx";
import { useState } from "react";
import useEventListener from "./useEventListener";

export const useKeyboardListener = () => {
  const { state, dispatch } = useGameCtx();
  const [showShortcuts, setShowShortcuts] = useState(false);
  useEventListener("keyup", (e) => {
    console.log("up", e.key);
    if (e.key === "Meta") setShowShortcuts(false);
  });
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
  const letters = expandedLetters.filter(
    (letter) => !["t", "g", "b"].includes(letter)
  );
  const activeLetters =
    state.boardCards?.length > 12 ? expandedLetters : letters;
  useEventListener("keydown", (e) => {
    if (e.key === "Meta") setShowShortcuts(true);
    if (!expandedLetters.includes(e.key)) return;
    const cardIndex = activeLetters.indexOf(e.key);
    const card = state.boardCards[cardIndex];
    if (card) {
      dispatch({ type: "TOGGLE_CARD", payload: { card } });
    }
  });
  return { showShortcuts, activeLetters };
};

export default useKeyboardListener;
