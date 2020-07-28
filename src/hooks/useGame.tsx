/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import useRenderCount from "@hooks/useRenderCount";
import { useUserCtx } from "context/user/UserCtx";
import firebase from "firebase";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useRef } from "react";

import { useFBCtx } from "../../context/firebase/firebaseCtx";

export const useGame = () => {
  useRenderCount("useGame");
  const router = useRouter();
  const gameId = router.query.gameId as string;
  const { db, firestore, functions } = useFBCtx();
  const { user, userProfile } = useUserCtx();
  const { push } = useRouter();

  const navToGame = (_gameId: string) => {
    push(`/games/${_gameId}`);
  };

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

  const inviteToGame = useCallback(
    (uid: string) => {
      const time = moment().toISOString();
      db.ref(`/publicGames/${gameId}/invites`).update({
        [uid]: { time, invitedBy: user.uid },
      });
    },
    [gameId]
  );

  const requestToJoin = useCallback(() => {
    if (!user || !user.uid || !gameId) return;
    const requestTime = new Date().toISOString();
    db.ref(`/games/${gameId}/joinRequests`).update({
      [user.uid]: { requestTime },
    });
  }, [gameId]);

  const exitGame = useCallback(async (_gameId: string) => {
    const gamePlayersRef = db.ref(`games/${_gameId}/players`);
    const players = await gamePlayersRef.once("value", (snap) => snap.val());
    console.log("exit game", { players });
  }, []);

  const respondToRequest = async ({
    requesterUid,
    approved,
  }: {
    requesterUid: string;
    approved: boolean;
  }) => {
    const joinedAt = new Date().toISOString();
    const joinRequestRef = db.ref(
      `/games/${gameId}/joinRequests/${requesterUid}`
    );
    if (!approved) {
      return joinRequestRef.remove();
    }
    await joinRequestRef.remove();
    const promises = [];
    // update this game
    promises.push(
      db
        .ref(`/games/${gameId}/players/${requesterUid}`)
        .update({ joinedAt, admin: false })
    );
    // update public game
    promises.push(
      db
        .ref(`/publicGames/${gameId}/players/${requesterUid}`)
        .update({ joinedAt })
    );
    // update your profile
    promises.push(
      firestore.doc(`users/${user.uid}`).update({
        [`friends.${requesterUid}`]: firebase.firestore.FieldValue.arrayUnion({
          gameId,
          gameDate: moment().toISOString(),
        }),
      })
    );
    return Promise.all(promises);
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
    navToGame,
    requestToJoin,
    respondToRequest,
    setCurrentOptionsAsDefault,
    startGame,
    findAvailableName,
    exitGame,
    inviteToGame,
  };
};

export default useGame;
