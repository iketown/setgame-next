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
  const playerIds = useMemo(() => players && Object.keys(players), [players]);

  const gameRef = useMemo(() => {
    if (!gameId) return null;
    return db.ref(`games/${gameId}`);
  }, [gameId]);

  useEffect(() => {
    const playersRef = gameRef && gameRef.child("players");
    if (!playersRef) return;
    playersRef.on("value", (snap) => {
      console.log("updating players");
      setPlayers(snap.val());
    });
    return playersRef?.off;
  }, [gameRef]);

  useEffect(() => {
    if (!fs || !playerIds || !playerIds.length) return;
    const usersRef = fs
      .collection("users")
      .where(firestore.FieldPath.documentId(), "in", playerIds);
    const unsubscribe = usersRef.onSnapshot((snap) => {
      const _playerProfiles: { [uid: string]: PlayerProfile } = {};
      if (!snap.empty) {
        snap.forEach((doc) => {
          // @ts-ignore
          _playerProfiles[doc.id] = doc.data();
        });
        console.log("updating player profiles");
        setPlayerProfiles(_playerProfiles);
      }
    });
    return unsubscribe;
  }, [playerIds]);

  return { players, playerProfiles };
};

export default usePlayerProfiles;
