/* eslint-disable no-console */
import { useRouter } from "next/router";
import { useUserCtx } from "context/user/UserCtx";
import moment from "moment";
import { useFBCtx } from "../../context/firebase/firebaseCtx";
import { useGameCtx } from "../../context/game/GameCtx";

export const useGame = () => {
  const { db, firestore, functions } = useFBCtx();
  const { user, userProfile } = useUserCtx();
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
    createGame,
    navToGame,
    requestToJoin,
    respondToRequest,
    setCurrentOptionsAsDefault,
    startGame,
  };
};

export default useGame;
