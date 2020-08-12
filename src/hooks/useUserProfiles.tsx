/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from "react";
import { useFBCtx } from "@context/firebase/firebaseCtx";

//
export const useUserProfiles = () => {
  const [userProfiles, setUserProfiles] = useState<{
    [uid: string]: PlayerProfile;
  }>({});
  const [userIds, setUserIds] = useState<string[]>([]);
  const { firestore: fs } = useFBCtx();

  useEffect(() => {
    if (!fs || !userIds?.length) return;
    const userListeners = userIds.map((userId) => {
      const unsub = fs.doc(`/users/${userId}`).onSnapshot((doc) => {
        // @ts-ignore
        const thisProfile: PlayerProfile = doc.data();
        setUserProfiles((old) => ({ ...old, [doc.id]: thisProfile }));
      });
      return unsub;
    });
    return () => {
      userListeners.forEach((unsub) => unsub());
    };
  }, [userIds]);

  return { userProfiles, setUserIds, userIds };
};
