/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import { useRouter } from "next/router";
import { useUserCtx } from "context/user/UserCtx";
import moment from "moment";
import { useCallback } from "react";
import { useFBCtx } from "../../context/firebase/firebaseCtx";
import { useGameCtx } from "../../context/game/GameCtx";

export const useGame = () => {
  const { db, firestore, functions } = useFBCtx();
  const { user, userProfile } = useUserCtx();
  const { gameId, setGameId } = useGameCtx();
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

  const findAvailableName = async (baseName: string) => {
    if (await checkNameAvailable(baseName)) return baseName;
    let isAvail = false;
    let extraNum = 0;
    while (!isAvail || extraNum < 100) {
      extraNum++;
      isAvail = await checkNameAvailable(`${baseName}_${extraNum}`);
    }
    return `${baseName}_${extraNum}`;
  };

  const createNewGame = async (_gameId: string) => {
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
  };

  const startGame = () => {
    const gameStartTime = moment().add(5, "seconds").toISOString();
    db.ref(`/games/${gameId}`).update({ gameStartTime });
  };

  const requestToJoin = () => {
    if (!user || !user.uid || !gameId) return;
    const requestTime = new Date().toISOString();
    const requesterProfile = userProfile;
    db.ref(`/games/${gameId}/joinRequests`).update({
      [user.uid]: { requestTime, requesterProfile },
    });
  };

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

    return db
      .ref(`/games/${gameId}/players/${requesterUid}`)
      .update({ joinedAt, admin: false });

    // const responseFxn = functions.httpsCallable("respondToRequest");
    // responseFxn({ gameId, requesterUid, approved });
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
    navToGame,
    requestToJoin,
    respondToRequest,
    setCurrentOptionsAsDefault,
    startGame,
    findAvailableName,
  };
};

export default useGame;
