import { useRouter } from "next/router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import moment from "moment";

import { useUserCtx } from "context/user/UserCtx";
import { usePlayerProfiles } from "../../src/hooks/usePlayerProfiles";
import {
  gameOptionsReducer,
  initialGOState,
} from "../../src/components/gameOptions/gameOptionsReducer";
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
});

export const GameCtxProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const gameId = router.query.gameId as string;
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [optionsState, optionsDispatch] = useReducer(
    gameOptionsReducer,
    initialGOState
  );
  const [isGameAdmin, setIsGameAdmin] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);
  const [gameRequests, setGameRequests] = useState<GameRequests>();
  const { db } = useFBCtx();
  const { user } = useUserCtx();
  const gameRef = useMemo(() => {
    return db.ref(`games/${gameId}`);
  }, [gameId]);

  const { players, playerProfiles } = usePlayerProfiles(gameId);
  // const playerProfiles = {};
  // console.log("render GameCtx", renderCount.current++);

  const updateWithSuccessDelay = useCallback((snapValue: any) => {
    const {
      boardCards = [],
      deckCards = [],
      playedSets = [],
      options = {},
      successSet = {},
      sets,
    } = snapValue;

    const fullUpdateBoard = () => {
      dispatch({
        type: "UPDATE_BOARD",
        payload: { boardCards, deckCards, sets, successSet },
      });
    };
    const successCardsOnlyUpdateBoard = () => {
      dispatch({ type: "SHOW_SUCCESS_SET", payload: { successSet } });
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
    gameRef.on("value", (snapshot) => {
      if (!snapshot.val()) {
        dispatch({
          type: "SET_MESSAGE",
          payload: {
            message: { type: "NO_GAME_FOUND", message: "No Game Found" },
          },
        });
        return null;
      }

      dispatch({
        type: "SET_MESSAGE",
        payload: {
          message: null,
        },
      });
      const snapValues = snapshot.val();
      const { players: _players, joinRequests } = snapValues;
      updateWithSuccessDelay(snapValues);
      if (user?.uid && _players && _players[user.uid]) {
        setIsPlayer(true);
        if (_players[user.uid].admin) setIsGameAdmin(true);
      }
      setGameRequests(joinRequests);
    });
    return () => gameRef.off();
  }, [db, gameRef, user]);

  return (
    <GameCtx.Provider
      value={{
        state,
        dispatch,
        gameId,
        optionsState,
        optionsDispatch,
        gameRef,
        isGameAdmin,
        isPlayer,
        playerProfiles,
        gameRequests,
      }}
      {...{ children }}
    />
  );
};

export const useGameCtx = () => useContext(GameCtx);
