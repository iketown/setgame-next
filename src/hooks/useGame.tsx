/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

  const checkNameAvailable = useCallback(async (_gameId: string) => {
    const gameRef = db.ref(`currentGames/${_gameId}`);
    let nameAvailable = false;
    await gameRef.once("value", (snap) => {
      nameAvailable = !snap.exists();
    });
    return nameAvailable;
  }, []);

  const findAvailableName = useCallback(async (baseName: string) => {
    if (await checkNameAvailable(baseName)) return baseName;
    let isAvail = false;
    let extraNum = 0;
    while (!isAvail || extraNum < 100) {
      extraNum++;
      isAvail = await checkNameAvailable(`${baseName}_${extraNum}`);
    }
    return `${baseName}_${extraNum}`;
  }, []);

  const createNewGame = useCallback(async (_gameId: string) => {
    console.log("trying to create game");
    const createGameFxn = functions.httpsCallable("createGame");
    try {
      const response = await createGameFxn({
        gameId: _gameId,
      });
      return response;
    } catch (error) {
      console.error("error", error);
    }
  }, []);

  const createPendingGame = useCallback(async (_gameId: string) => {
    console.log("creating pending game", _gameId);
    const promises = [];
    promises.push(db.ref(`/games/${_gameId}`).update({ isValid: true }));
    promises.push(db.ref(`/publicGames/${_gameId}`).update({ isValid: true }));
    Promise.all(promises).then(() => {
      createNewGame(_gameId);
    });
  }, []);

  const deleteGame = useCallback(async (_gameId: string) => {
    const deleteGameFxn = functions.httpsCallable("deleteGame");
    return deleteGameFxn({ gameId: _gameId });
  }, []);

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
    [gameId]
  );

  const endGame = useCallback(async (_gameId: string) => {
    db.ref(`/games/${_gameId}`).update({ ended: moment().toISOString() });
    db.ref(`/publicGames/${_gameId}`).remove();
  }, []);

  const setNewAdmin = useCallback(
    async (_gameId: string, newAdminUid: string) => {
      const newAdminRef = db.ref(`games/${_gameId}/players/${newAdminUid}`);
      newAdminRef.update({ admin: true });
    },
    []
  );

  const removeMeFromGame = (_gameId: string) => {
    if (!user) return;
    db.ref(`/games/${_gameId}/players/${user.uid}`).remove();
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
    createNewGame,
    createPendingGame,
    deleteGame,
    setCurrentOptionsAsDefault,
    startGame,
    findAvailableName,
    removeMeFromGame,
    setNewAdmin,
    endGame,
  };
};

export default useGame;
