/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-underscore-dangle */
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useEffect, useState } from "react";

export const usePlayerProfiles = (gameId: string) => {
  const { db, firestore: fs } = useFBCtx();
  const [players, setPlayers] = useState<{ [uid: string]: GamePlayer }>();
  const [playerProfiles, setPlayerProfiles] = useState<{
    [uid: string]: PlayerProfile;
  }>();

  useEffect(() => {
    if (!gameId) return;
    const gameRef = db.ref(`games/${gameId}`);
    const playersRef = gameRef.child("players");
    playersRef.on("value", (snap) => {
      if (!snap.exists || !snap.val()) return;
      setPlayers(snap.val());
    });
    return () => playersRef.off("value");
  }, [gameId, db]);

  useEffect(() => {
    if (!fs || !players) return;
    const playerIds = Object.keys(players);
    if (!playerIds.length) return;
    const playerListeners = playerIds.map((userId) => {
      const unsub = fs.doc(`/users/${userId}`).onSnapshot((doc) => {
        // @ts-ignore
        const thisProfile: PlayerProfile = doc.data();
        setPlayerProfiles((old) => ({ ...old, [doc.id]: thisProfile }));
      });
      return unsub;
    });
    return () => {
      playerListeners.forEach((unsub) => unsub());
    };
  }, [players, fs]);

  return { players, playerProfiles };
};

export default usePlayerProfiles;
