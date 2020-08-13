/* */
import React, { createContext, useContext, useReducer } from "react";
import { soloGameReducer, initialState } from "./soloGameReducer";

const SoloGameCtx = createContext<{
  soloState: SoloGameState;
  soloDispatch: React.Dispatch<SoloGameAction>;
}>({
  soloState: initialState,
  soloDispatch: () => {
    throw new Error("out of context");
  },
});

export const SoloGameCtxProvider: React.FC = ({ children }) => {
  const [soloState, soloDispatch] = useReducer(soloGameReducer, initialState);
  return (
    <SoloGameCtx.Provider
      value={{ soloState, soloDispatch }}
      {...{ children }}
    />
  );
};

export const useSoloGameCtx = () => useContext(SoloGameCtx);
