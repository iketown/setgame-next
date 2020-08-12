/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import {
  gameOptionsReducer,
  initialGOState,
} from "@components/gameOptions/gameOptionsReducer";
import { useUserCtx } from "@context/user/UserCtx";
import { useGame } from "@hooks/useGame";
import { usePlayerProfiles } from "@hooks/usePlayerProfiles";
import { useRenderCount } from "@hooks/useRenderCount";
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
import { getSets } from "../../utils/checkCards";

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
  setGameId: errorFxn,
  isGameAdmin: false,
  isPlayer: false,
  setIsPlayer: () => {},
  gameOver: false,
  gameStartTime: false,
  gameEnded: false,
  invalidName: false,
  allowsNewPlayers: false,
});

export const GameCtxProvider: React.FC = ({ children }) => {
  useRenderCount("GameCtxProvider");
  const { query } = useRouter();
  const [gameId, setGameId] = useState("");

  useEffect(() => {
    setGameId(query.gameId as string);
  }, [query.gameId]);

  const [state, dispatch] = useReducer(gameReducer, {
    ...initialGameState,
  });
  const [gameOver, setGameOver] = useState<false | string>(false);
  const [gameStartTime, setGameStartTime] = useState<string | false>(false);
  const [gameEnded, setGameEnded] = useState<string | false>(false);
  const [optionsState, optionsDispatch] = useReducer(
    gameOptionsReducer,
    initialGOState
  );
  const [isGameAdmin, setIsGameAdmin] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);
  const [allowsNewPlayers, setAllowsNewPlayers] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const { db } = useFBCtx();
  const { user } = useUserCtx();
  const { playerProfiles } = usePlayerProfiles(gameId);
  const { createNewGame } = useGame();

  const updateWithSuccessDelay = useCallback((snapValue: any) => {
    // success delay is so you have a second to see what the
    // last successful set was before they disappear.
    const {
      boardCards = [],
      deckCards = [],
      playedSets = {},
      options = {},
      successSet = {},
      sets,
    } = snapValue;

    const successCardsOnlyUpdateBoard = () => {
      dispatch({
        type: "SHOW_SUCCESS_SET",
        payload: { successSet, playedSets },
      });
    };
    const fullUpdateBoard = () => {
      dispatch({
        type: "UPDATE_BOARD",
        payload: { boardCards, deckCards, sets, successSet, playedSets },
      });
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

  const createGame = useCallback(async (_gameId: string) => {
    const { data } = await createNewGame(_gameId);
    if (data && data.invalidName) {
      setInvalidName(true);
    }
  }, []);

  useEffect(() => {
    // firebase game controller.
    if (!gameId || !user?.uid) return;
    const gameRef = db.ref(`games/${gameId}`);

    gameRef.on("value", (snapshot) => {
      if (!snapshot.exists || !snapshot.val()) {
        createGame(gameId);
        return;
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
        allowNewPlayers,
        ended,
        gameOver: _gameOver,
        gameStartTime: _gameStartTime,
      } = snapValues;
      setGameOver(_gameOver);
      if (user?.uid && _players && _players[user.uid]) {
        setIsPlayer(true);
        if (_players[user.uid].admin) setIsGameAdmin(true);
      }
      if (_gameStartTime) {
        setGameStartTime(_gameStartTime);
        if (moment().isAfter(_gameStartTime)) {
          // most game updates go here.
          updateWithSuccessDelay(snapValues);
        } else {
          // game is about to start in 5 seconds or so.
          dispatch({
            type: "SET_DELAYED_STATE",
            payload: { ...snapValues },
          });
        }
      }
      if (ended) {
        setGameEnded(ended);
      }
      setAllowsNewPlayers(allowNewPlayers);
    });

    return () => gameRef.off("value");
  }, [db, user, gameId]);

  return (
    <GameCtx.Provider
      value={{
        state,
        dispatch,
        gameId,
        setGameId,
        optionsState,
        optionsDispatch,
        isGameAdmin,
        isPlayer,
        setIsPlayer,
        playerProfiles,
        allowsNewPlayers,
        gameOver,
        setGameOver,
        gameStartTime,
        gameEnded,
        invalidName,
      }}
      {...{ children }}
    />
  );
};

export const useGameCtx = (): GameContextType => useContext(GameCtx);
