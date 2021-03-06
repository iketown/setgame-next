/* eslint-disable no-plusplus */
import { useGameCtx } from "@context/game/GameCtx";
import { useSetListener } from "@hooks/useSetListener";
import { useCallback } from "react";
import moment from "moment";
import { useSoloGameCtx } from "@context/game/SoloGameCtx";
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useRouter } from "next/router";
import { getMixedDeck } from "../../functions/cards/allCards";
import { useUserCtx } from "../context/user/UserCtx";
import { getSets } from "../utils/checkCards";
//
//
export const useSoloGame = () => {
  const { dispatch, state, setIsPlayer, setGameOver } = useGameCtx();
  const { soloDispatch, soloState } = useSoloGameCtx();
  const { user } = useUserCtx();
  const { firestore, functions } = useFBCtx();
  const { push, query } = useRouter();

  const handleSaveGame = useCallback(
    async (_soloGameId: string) => {
      if (!user?.uid) return;
      const { boardCards, deckCards } = state;
      const gameRef = firestore.doc(
        `users/${user.uid}/savedSoloGames/${_soloGameId}`
      );
      await gameRef.set({ ...soloState, gameState: { boardCards, deckCards } });
      push("/", "/");
    },
    [firestore, push, soloState, state, user?.uid]
  );

  const deleteSavedGame = useCallback(
    (gameId: string) => {
      if (!user?.uid) {
        return;
      }
      firestore.doc(`/users/${user.uid}/savedSoloGames/${gameId}`).delete();
    },
    [firestore, user?.uid]
  );

  const handleStartGame = useCallback(() => {
    const deck = getMixedDeck();
    let boardCards = deck.slice(0, 12);
    let deckCards = deck.slice(12);
    for (let i = 0; !getSets(boardCards).length; i += 3) {
      boardCards = deck.slice(0, 12 + i);
      deckCards = deck.slice(12 + i);
    }
    setIsPlayer(true);
    const sets = getSets(boardCards);
    dispatch({
      type: "UPDATE_BOARD",
      payload: {
        boardCards,
        deckCards,
        sets: { length: sets.length, sets },
      },
    });
    soloDispatch({
      type: "LATEST_SET_TIME",
      payload: { latestSetTime: moment().add(1, "second").format() },
    });
  }, [dispatch, setIsPlayer, soloDispatch]);

  const submitSetApi = useCallback(
    ({ mySet }: { mySet: string[] }) => {
      const { deckCards } = state;
      let boardCards = state.boardCards.filter(
        (cardId) => !mySet.includes(cardId)
      );
      const latestSetTime = moment().format();
      soloDispatch({ type: "LATEST_SET_TIME", payload: { latestSetTime } });

      while (
        (!getSets(boardCards).length || boardCards.length < 12) &&
        deckCards.length >= 3
      ) {
        const threeCards = deckCards.splice(0, 3);
        boardCards = [...boardCards, ...threeCards];
      }
      const sets = getSets(boardCards);
      if (!sets.length) {
        // HANDLE GAME OVER
        const registerSoloGame = functions.httpsCallable("registerSoloGame");
        const gameId = query.soloGameId as string;
        registerSoloGame({
          gameId,
          points: soloState.points + 3 + soloState.bonusPoints,
        });
        setGameOver(moment().format());
        deleteSavedGame(gameId);
      }

      dispatch({
        type: "UPDATE_BOARD",
        payload: { deckCards, boardCards, sets: { length: sets.length, sets } },
      });
      soloDispatch({
        type: "LATEST_SET_TIME",
        payload: { latestSetTime: moment().format() },
      });
      soloDispatch({
        type: "ADD_SET_TO_SCORE",
        payload: { set: mySet, time: moment().format() },
      });
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1500);
      });
    },
    [
      deleteSavedGame,
      dispatch,
      functions,
      query.soloGameId,
      setGameOver,
      soloDispatch,
      soloState.bonusPoints,
      soloState.points,
      state,
    ]
  );

  const punishFail = () => {
    soloDispatch({ type: "PUNISH_SCORE" });
  };

  useSetListener({ submitSetApi, punishFail });

  return { handleStartGame, handleSaveGame, deleteSavedGame };
};

export default useSoloGame;
