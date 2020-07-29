import { useRenderCount } from "@hooks/useRenderCount";
import { useUserCtx } from "@context/user/UserCtx";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { useFBCtx } from "@context/firebase/firebaseCtx";

export const useGameInvites = () => {
  useRenderCount("useGameInvites");
  const router = useRouter();
  const gameId = router.query.gameId as string;
  const { db } = useFBCtx();
  const { user } = useUserCtx();

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

  const cancelRequestToJoin = useCallback(() => {
    if (!user || !user.uid || !gameId) return;
    db.ref(`/games/${gameId}/joinRequests/${user.uid}`).remove();
  }, [gameId]);

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

    return Promise.all(promises);
  };

  return {
    inviteToGame,
    requestToJoin,
    cancelRequestToJoin,
    respondToRequest,
  };
};

export default useGameInvites;
