/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable consistent-return */
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useGameCtx } from "@context/game/GameCtx";
import { useUserCtx } from "@context/user/UserCtx";
import { useRenderCount } from "@hooks/useRenderCount";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";

//
//
export const usePreGame = () => {
  useRenderCount("usePreGame");
  const [thisPublicGame, setThisPublicGame] = useState<PublicGame>();
  const { db } = useFBCtx();
  const { userProfile } = useUserCtx();

  const { gameId } = useGameCtx();

  useEffect(() => {
    if (!gameId) return;
    const thisPGameRef = db.ref(`publicGames/${gameId}`);
    thisPGameRef.on("value", (snap) => {
      setThisPublicGame(snap.val());
    });
    return () => thisPGameRef.off();
  }, [gameId]);

  const friendsLatestFirst = useMemo(() => {
    if (!userProfile?.friends) return null;
    return Object.entries(userProfile.friends).sort(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([uid1, lastPlayed1], [uid2, lastPlayed2]) => {
        return moment(lastPlayed1).isAfter(lastPlayed2) ? -1 : 1;
      }
    );
  }, [userProfile?.friends]);

  return { thisPublicGame, friendsLatestFirst };
};

export default usePreGame;
