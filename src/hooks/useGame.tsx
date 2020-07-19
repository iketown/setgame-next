import React, { useCallback } from "react";
import { useFBCtx } from "../../context/firebase/firebaseCtx";
import { useRouter } from "next/router";

export const useGame = () => {
  const { db, user, functions } = useFBCtx();
  const { push } = useRouter();
  const createGame = async (gamePrivate?: boolean) => {
    const createGameFxn = functions.httpsCallable("createGame");
    try {
      const result: {
        data: { refString: string; gameId: string };
      } = await createGameFxn({
        private: gamePrivate,
      });
      const { gameId, refString } = result.data;
      console.log({ gameId, refString });
      navToGame(gameId);
    } catch (error) {
      console.error("error", error);
    }
  };
  const navToGame = (gameId: string) => {
    push(`/games/${gameId}`);
  };
  return { createGame, navToGame };
};
