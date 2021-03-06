/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import { useRenderCount } from "@hooks/useRenderCount";
import { useUserCtx } from "@context/user/UserCtx";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { useFBCtx } from "@context/firebase/firebaseCtx";

export const useGame = () => {
  useRenderCount("useGame");
  const router = useRouter();
  const gameId = router.query.gameId as string;
  const { db, firestore, functions } = useFBCtx();
  const { user } = useUserCtx();
  type CallableFxn =
    | "createRematch"
    | "createGame"
    | "deleteGame"
    | "submitSet";

  const wakeUpFxn = useCallback(
    async (names: CallableFxn[]) => {
      const promises: Promise<any>[] = names.map((name) => {
        const fxn = functions.httpsCallable(name);
        return fxn({ wakeUp: true });
      });
      const responses = await Promise.all(promises);
      console.log("wake up responses", responses);
    },
    [functions]
  );

  const createRematch = useCallback(
    async (_gameId: string, gameStartTime: string) => {
      const createRematchFxn = functions.httpsCallable("createRematch");
      return createRematchFxn({
        newGameId: _gameId,
        oldGameId: gameId,
        gameStartTime,
      });
    },
    [functions, gameId]
  );

  const makeRematch = useCallback(
    async (rematchGameId: string) => {
      // if someone else started it already, join it.
      const newGameRef = db.ref(`/games/${rematchGameId}`);
      const newGame = await newGameRef.once("value").then((snap) => snap.val());
      if (!newGame) {
        await newGameRef.update({ isValid: true });
        const nextGameStart = moment().add(1, "minute").toISOString();
        await db.ref(`/games/${gameId}/rematch`).update({ nextGameStart });
        await createRematch(rematchGameId, nextGameStart);
      }
      console.log("newGame value", newGame);
    },
    [createRematch, db, gameId]
  );

  const createNewGame = useCallback(
    (_gameId: string) => {
      console.log("trying to create game");
      const createGameFxn = functions.httpsCallable("createGame");
      try {
        createGameFxn({
          gameId: _gameId,
        }).then(({ data }) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (data.invalidName) {
            router.push("/", "/");
          }
        });
      } catch (error) {
        console.error("error", error);
      }
    },
    [functions, router]
  );

  const createPendingGame = useCallback(
    async (_gameId: string) => {
      console.log("creating pending game", _gameId);
      const promises = [];
      promises.push(
        db.ref(`/games/${_gameId}`).update({
          isValid: true,
          players: {
            [user.uid]: { admin: true, joinedAt: moment().toISOString() },
          },
        })
      );
      promises.push(
        db.ref(`/publicGames/${_gameId}`).update({
          isValid: true,
          players: {
            [user.uid]: { admin: true, joinedAt: moment().toISOString() },
          },
        })
      );
      return Promise.all(promises).then(() => {
        createNewGame(_gameId);
      });
    },
    [createNewGame, db, user?.uid]
  );

  const deleteGame = useCallback(
    async (_gameId: string) => {
      const deleteGameFxn = functions.httpsCallable("deleteGame");
      return deleteGameFxn({ gameId: _gameId });
    },
    [functions]
  );

  const startGame = useCallback(
    (allowNewPlayers = true) => {
      const gameStartTime = moment().add(5, "seconds").toISOString();
      db.ref(`/games/${gameId}`).update({
        gameStartTime,
        allowNewPlayers,
      });
      return db
        .ref(`/publicGames/${gameId}`)
        .update({ gameStartTime, allowNewPlayers });
    },
    [db, gameId]
  );

  const setNewAdmin = useCallback(
    async (_gameId: string, newAdminUid: string) => {
      const newAdminRef = db.ref(`games/${_gameId}/players/${newAdminUid}`);
      newAdminRef.update({ admin: true });
    },
    [db]
  );

  const endGame = useCallback(
    async (_gameId: string) => {
      if (!user) return;
      const promises = [
        db.ref(`/games/${_gameId}`).update({
          ended: moment().toISOString(),
          gameOver: moment().toISOString(),
        }),
        db.ref(`/publicGames/${_gameId}`).remove(),
      ];
      await Promise.all(promises);
      router.push(`/`, `/`);
    },
    [db, router, user]
  );

  const removeMeFromGame = useCallback(
    async (_gameId: string) => {
      if (!user) return;
      const promises = [
        db.ref(`/games/${_gameId}/players/${user.uid}`).remove(),
        db.ref(`/publicGames/${_gameId}/players/${user.uid}`).remove(),
      ];
      await Promise.all(promises);
      router.push(`/`, `/`);
    },
    [db, router, user]
  );

  const setCurrentOptionsAsDefault = async () => {
    if (!firestore || !user?.uid) return;
    const gameOptions = await db
      .ref(`games/${gameId}/options`)
      .once("value")
      .then((snap) => snap.val());
    firestore.doc(`users/${user.uid}`).update({ defaultOptions: gameOptions });
  };
  return {
    createNewGame,
    createPendingGame,
    deleteGame,
    setCurrentOptionsAsDefault,
    startGame,
    removeMeFromGame,
    setNewAdmin,
    endGame,
    makeRematch,
    wakeUpFxn,
  };
};

export default useGame;
