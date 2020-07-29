/* eslint-disable consistent-return */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFBCtx } from "@context/firebase/firebaseCtx";

export const usePresence = () => {
  const router = useRouter();
  const [playerIds, setPlayerIds] = useState<string[]>();
  const { db } = useFBCtx();
  const [whosHere, setWhosHere] = useState<{ [uid: string]: boolean }>();

  useEffect(() => {
    if (!playerIds || !playerIds.length) return;
    // keep track of which players are still here in this gameId
    const here = router.query?.gameId ? router.query?.gameId : "lobby";
    const playerRefs = playerIds.map((uid) => ({
      ref: db.ref(`status/${uid}`),
      uid,
    }));
    playerRefs.forEach(({ ref, uid }) => {
      ref.on("value", (snap) => {
        const value = snap.val();
        if (value.location === here) {
          setWhosHere((old) => ({ ...old, [uid]: true }));
        } else {
          setWhosHere((old) => ({ ...old, [uid]: false }));
        }
      });
    });
    return () => {
      playerRefs.forEach(({ ref }) => ref.off());
    };
  }, [playerIds, router]);

  return { setPlayerIds, whosHere };
};

export default usePresence;
