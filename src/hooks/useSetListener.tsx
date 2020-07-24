/* eslint-disable import/prefer-default-export */
import { useEffect } from "react";
import { useGameCtx } from "../../context/game/GameCtx";
import { checkSet } from "../../functions/cards/checkCards";
import { useFBCtx } from "../../context/firebase/firebaseCtx";

export const useSetListener = () => {
  const { state, dispatch, gameId } = useGameCtx();
  const { functions } = useFBCtx();

  const { mySet } = state;
  useEffect(() => {
    if (mySet.length < 3) return;
    const isValid = checkSet(...mySet);
    if (isValid) {
      const submitSet = functions.httpsCallable("submitSet");
      submitSet({ mySet, gameId }).then((response) => {
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
