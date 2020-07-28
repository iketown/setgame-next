import { useRenderCount } from "@hooks/useRenderCount";

/* eslint-disable consistent-return */
import { useState, useEffect, useMemo } from "react";
import moment from "moment";
import { useFBCtx } from "../../context/firebase/firebaseCtx";
import { useGameCtx } from "../../context/game/GameCtx";
import { useUserCtx } from "../../context/user/UserCtx";
//
//
export const usePreGame = () => {
  useRenderCount("usePreGame");
  const [thisPublicGame, setThisPublicGame] = useState<PublicGame>();
  const { db } = useFBCtx();
  const { userProfile } = useUserCtx();

  const { playerProfiles, gameId } = useGameCtx();

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
      ([uid1, gameArr1], [uid2, gameArr2]) => {
        const latestGame1 = gameArr1.sort((a, b) =>
          moment(a.gameDate).isAfter(b.gameDate) ? -1 : 1
        )[0].gameDate;
        const latestGame2 = gameArr2.sort((a, b) =>
          moment(a.gameDate).isAfter(b.gameDate) ? -1 : 1
        )[0].gameDate;
        return moment(latestGame1).isAfter(latestGame2) ? -1 : 1;
      }
    );
  }, [userProfile?.friends]);

  return { thisPublicGame, friendsLatestFirst };
};

export default usePreGame;
