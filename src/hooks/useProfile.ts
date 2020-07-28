/* eslint-disable consistent-return */
import { useRenderCount } from "@hooks/useRenderCount";
import { useEffect, useState } from "react";
import { useFBCtx } from "../../context/firebase/firebaseCtx";

export const useProfile = (uid?: string) => {
  const [profile, setProfile] = useState<PlayerProfile>();
  useRenderCount("useProfile");
  const { firestore } = useFBCtx();

  useEffect(() => {
    if (!uid || !firestore) return;
    const unsubscribe = firestore.doc(`users/${uid}`).onSnapshot((snap) => {
      if (snap.exists) {
        // @ts-ignore
        setProfile(snap.data());
      }
    });
    return unsubscribe;
  }, []);

  return { profile };
};

export default useProfile;
