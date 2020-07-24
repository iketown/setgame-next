/* eslint-disable consistent-return */
import {
  gameOptionsReducer,
  initialGOState,
} from "@components/gameOptions/gameOptionsReducer";
import { useUserCtx } from "context/user/UserCtx";
import moment from "moment";
import { useRouter } from "next/router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { usePlayerProfiles } from "../../src/hooks/usePlayerProfiles";
import { useFBCtx } from "../firebase/firebaseCtx";
import { gameReducer, initialGameState } from "./gameReducer";

const errorFxn = () => {
  console.error("out of context");
};
const GameCtx = createContext<GameContextType>({
  state: initialGameState,
  optionsState: initialGOState,
  optionsDispatch: errorFxn,
  dispatch: errorFxn,
  gameId: "",
  isGameAdmin: false,
  isPlayer: false,
  gameOver: false,
});

export const GameCtxProvider: React.FC<{ origin?: string }> = ({
  children,
  origin,
}) => {
  console.log("game ctx origin", origin);
  const router = useRouter();
  const gameId = router.query.gameId as string;
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [optionsState, optionsDispatch] = useReducer(
    gameOptionsReducer,
    initialGOState
  );
  const [isGameAdmin, setIsGameAdmin] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);
  const [gameRequests, setGameRequests] = useState<GameRequests>();
  const { db } = useFBCtx();
  const { user } = useUserCtx();

  const { players, playerProfiles } = usePlayerProfiles(gameId);
  // const playerProfiles = {};
  // console.log("render GameCtx", renderCount.current++);

  const updateWithSuccessDelay = useCallback((snapValue: any) => {
    const {
      boardCards = [],
      deckCards = [],
      playedSets = {},
      options = {},
      successSet = {},
      sets,
    } = snapValue;

    const fullUpdateBoard = () => {
      dispatch({
        type: "UPDATE_BOARD",
        payload: { boardCards, deckCards, sets, successSet, playedSets },
      });
    };
    const successCardsOnlyUpdateBoard = () => {
      dispatch({
        type: "SHOW_SUCCESS_SET",
        payload: { successSet, playedSets },
      });
      // dispatch({ type: "UPDATE_BOARD", payload: { successSet } });
    };

    optionsDispatch({
      type: "SET_OPTION",
      payload: { optionUpdates: options },
    });
    const delay = 1500;
    const timeSince = moment().diff(successSet.playedAt);
    const delayMs = Math.max(0, delay - timeSince);
    if (delayMs > 0) {
      successCardsOnlyUpdateBoard();
      setTimeout(fullUpdateBoard, delayMs);
    } else {
      fullUpdateBoard();
    }
  }, []);

  useEffect(() => {
    const noGameFound = () => {
      dispatch({
        type: "SET_MESSAGE",
        payload: {
          message: { type: "NO_GAME_FOUND", message: "No Game Found" },
        },
      });
    };
    if (!gameId) return;

    const gameRef = db.ref(`games/${gameId}`);
    gameRef.on("value", (snapshot) => {
      if (!snapshot.exists || !snapshot.val()) {
        noGameFound();
        return null;
      }

      dispatch({
        type: "SET_MESSAGE",
        payload: {
          message: null,
        },
      });
      const snapValues = snapshot.val();
      const {
        players: _players,
        joinRequests,
        gameOver: _gameOver,
        gameStarted: _gameStarted,
      } = snapValues;
      if (_gameOver) setGameOver(true);
      if (_gameStarted) setGameStarted(true);
      updateWithSuccessDelay(snapValues);
      if (user?.uid && _players && _players[user.uid]) {
        setIsPlayer(true);
        if (_players[user.uid].admin) setIsGameAdmin(true);
      }
      setGameRequests(joinRequests);
    });
    return gameRef.off;
  }, [db, user]);

  return (
    <GameCtx.Provider
      value={{
        state,
        dispatch,
        gameId,
        optionsState,
        optionsDispatch,
        isGameAdmin,
        isPlayer,
        playerProfiles,
        gameRequests,
        gameOver,
        gameStarted,
      }}
      {...{ children }}
    />
  );
};

export const useGameCtx = () => useContext(GameCtx);
