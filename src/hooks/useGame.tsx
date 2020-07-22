/* eslint-disable no-console */
import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserCtx } from "context/user/UserCtx";
import { useFBCtx } from "../../context/firebase/firebaseCtx";
import { useGameCtx } from "../../context/game/GameCtx";

export const useGame = () => {
  const { db, firestore, functions } = useFBCtx();
  const { user } = useUserCtx();
  const { gameId } = useGameCtx();
  const { push } = useRouter();

  const navToGame = (_gameId: string) => {
    push(`/games/${_gameId}`);
  };

  const createGame = async (gamePrivate?: boolean) => {
    console.log("trying to create game");
    const createGameFxn = functions.httpsCallable("createGame");
    try {
      const result: {
        data: { refString: string; gameId: string };
      } = await createGameFxn({
        isPrivate: gamePrivate,
      });
      // eslint-disable-next-line no-shadow
      const { gameId } = result.data;
      console.log("createGame response", result);
      navToGame(gameId);
    } catch (error) {
      console.error("error", error);
    }
  };

  const requestToJoin = () => {
    const requestFxn = functions.httpsCallable("requestToJoin");
    requestFxn({ gameId });
  };
  const respondToRequest = ({
    requesterUid,
    approved,
  }: {
    requesterUid: string;
    approved: boolean;
  }) => {
    const responseFxn = functions.httpsCallable("respondToRequest");
    responseFxn({ gameId, requesterUid, approved });
  };

  const setCurrentOptionsAsDefault = async () => {
    if (!firestore || !user?.uid) return;
    const gameOptions = await db
      .ref(`games/${gameId}/options`)
      .once("value")
      .then((snap) => snap.val());
    firestore.doc(`users/${user.uid}`).update({ defaultOptions: gameOptions });
  };
  return {
    createGame,
    navToGame,
    requestToJoin,
    respondToRequest,
    setCurrentOptionsAsDefault,
  };
};

export default useGame;
