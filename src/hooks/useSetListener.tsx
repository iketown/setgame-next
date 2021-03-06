/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import { useGameCtx } from "@context/game/GameCtx";
import { useEffect } from "react";
import { checkSet } from "../../functions/cards/checkCards";

export const useSetListener = ({
  submitSetApi,
  punishFail,
}: {
  submitSetApi: ({ mySet }) => Promise<any>;
  punishFail?: () => void;
}) => {
  const { state, dispatch } = useGameCtx();
  const { mySet } = state;

  useEffect(() => {
    if (mySet.length < 3) return;
    const isValid = checkSet(...mySet);
    if (isValid) {
      submitSetApi({ mySet }).then(() => {
        dispatch({ type: "CLEAR_SET", payload: {} });
      });
    } else {
      dispatch({ type: "FAIL_SET", payload: { set: mySet } });
      dispatch({ type: "CLEAR_SET", payload: {} });
      if (punishFail) punishFail();
    }
  }, [dispatch, mySet, punishFail, submitSetApi]);
};
