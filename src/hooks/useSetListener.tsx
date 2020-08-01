/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useGameCtx } from "@context/game/GameCtx";
import { useEffect } from "react";

import { checkSet } from "../../functions/cards/checkCards";

export const useSetListener = () => {
  const { state, dispatch, gameId } = useGameCtx();
  const { functions } = useFBCtx();
  const { mySet, boardCards, deckCards } = state;

  useEffect(() => {
    if (mySet.length < 3) return;
    const isValid = checkSet(...mySet);
    if (isValid) {
      const submitSet = functions.httpsCallable("submitSet");
      submitSet({ mySet, gameId }).then(() => {
        dispatch({ type: "CLEAR_SET", payload: {} });
      });
    } else {
      dispatch({ type: "FAIL_SET", payload: { set: mySet } });
      // setTimeout(() => {
      //   dispatch({ type: "FAIL_SET", payload: { set: undefined } });
      // }, 2000);
      dispatch({ type: "CLEAR_SET", payload: {} });
    }
  }, [mySet]);
};
