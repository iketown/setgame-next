/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-underscore-dangle */
import { useFBCtx } from "context/firebase/firebaseCtx";
import { useEffect, useMemo, useState } from "react";
import { firestore } from "firebase";

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
    return playersRef.off;
  }, [gameId]);

  useEffect(() => {
    if (!fs || !players) return;
    const playerIds = Object.keys(players);
    if (!playerIds.length) return;
    const usersRef = fs
      .collection("users")
      .where(firestore.FieldPath.documentId(), "in", playerIds);
    const unsubscribe = usersRef.onSnapshot((snap) => {
      const _playerProfiles: { [uid: string]: PlayerProfile } = {};
      snap.forEach((doc) => {
        // @ts-ignore
        _playerProfiles[doc.id] = doc.data();
      });
      setPlayerProfiles(_playerProfiles);
    });
    return unsubscribe;
  }, [players]);

  return { players, playerProfiles };
};

export default usePlayerProfiles;
