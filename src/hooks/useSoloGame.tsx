/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-plusplus */
import { useGameCtx } from "@context/game/GameCtx";
import { useSetListener } from "@hooks/useSetListener";
import { useCallback } from "react";
import moment from "moment";
import { useSoloGameCtx } from "@context/game/SoloGameCtx";
import shortid from "shortid";
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
  const { firestore } = useFBCtx();
  const { push } = useRouter();

  const handleSaveGame = async () => {
    if (!user.uid) return;
    const { boardCards, deckCards } = state;
    const gameRef = firestore.doc(
      `users/${user.uid}/savedSoloGames/${soloState.gameId}`
    );
    await gameRef.set({ ...soloState, gameState: { boardCards, deckCards } });
    push("/solo", "/solo");
  };

  const deleteSavedGame = useCallback(
    (gameId: string) => {
      if (!user?.uid) return;
      firestore.doc(`users/${user.uid}/savedSoloGames/${gameId}`).delete();
    },
    [user]
  );

  const handleStartGame = (specialDeck?: string[]) => {
    const deck = specialDeck || getMixedDeck();
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
      type: "SET_GAMEID",
      payload: { gameId: shortid.generate() },
    });
    soloDispatch({
      type: "LATEST_SET_TIME",
      payload: { latestSetTime: moment().add(1, "second").format() },
    });
  };

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
        setGameOver(moment().format());
        deleteSavedGame(soloState.gameId);
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
    [state]
  );

  const punishFail = () => {
    soloDispatch({ type: "PUNISH_SCORE" });
  };

  useSetListener({ submitSetApi, punishFail });

  return { handleStartGame, handleSaveGame, deleteSavedGame };
};

export default useSoloGame;
