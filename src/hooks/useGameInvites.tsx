import { useRenderCount } from "@hooks/useRenderCount";
import { useUserCtx } from "@context/user/UserCtx";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useState, useEffect } from "react";

import { useFBCtx } from "@context/firebase/firebaseCtx";

export const useGameInvites = () => {
  useRenderCount("useGameInvites");
  const router = useRouter();
  const gameId = router.query.gameId as string;
  const [gameRequests, setGameRequests] = useState<{
    [userId: string]: { requestTime: string };
  }>();
  const { db } = useFBCtx();
  const { user } = useUserCtx();

  useEffect(() => {
    // listen for requests
    const requestsRef = db.ref(`/joinRequests/${gameId}`);
    requestsRef.on("value", (snap) => {
      setGameRequests(snap.val());
    });
    return () => requestsRef.off();
  }, []);

  const requestToJoin = useCallback(() => {
    if (!user || !user.uid || !gameId) return;
    const requestTime = new Date().toISOString();
    db.ref(`/joinRequests/${gameId}`).update({
      [user.uid]: { requestTime },
    });
  }, [gameId]);

  const cancelRequestToJoin = useCallback(() => {
    if (!user || !user.uid || !gameId) return;
    db.ref(`/joinRequests/${gameId}/${user.uid}`).remove();
  }, [gameId, user]);

  const respondToRequest = async ({
    requesterUid,
    approved,
  }: {
    requesterUid: string;
    approved: boolean;
  }) => {
    const joinedAt = new Date().toISOString();
    const joinRequestRef = db.ref(`/joinRequests/${gameId}/${requesterUid}`);
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

    return Promise.all(promises);
  };

  return {
    requestToJoin,
    cancelRequestToJoin,
    respondToRequest,
    gameRequests,
  };
};

export default useGameInvites;
