import React from "react";
import { Button } from "@material-ui/core";
import { useGameCtx } from "@context/game/GameCtx";
//
//
const CheatButtons: React.FC = () => {
  const { state, dispatch, isPlayer } = useGameCtx();
  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv !== "development") return null;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {state.sets?.sets?.map((set, i) => {
        const onClick = () => {
          if (!isPlayer) return;
          set.forEach((card) => {
            dispatch({ type: "TOGGLE_CARD", payload: { card } });
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
    </div>
  );
};

export default CheatButtons;
