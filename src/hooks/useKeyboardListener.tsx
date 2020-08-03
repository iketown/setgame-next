/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useGameCtx } from "@context/game/GameCtx";
import useEventListener from "./useEventListener";

export const useKeyboardListener = () => {
  const { state, dispatch } = useGameCtx();

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
    const activeLetters =
      state.boardCards?.length > 12 ? expandedLetters : letters;
    const cardIndex = activeLetters.indexOf(e.key);
    const card = state.boardCards[cardIndex];
    dispatch({ type: "TOGGLE_CARD", payload: { card } });
    console.log("keyboard card", card);
  });
};

export default useKeyboardListener;
