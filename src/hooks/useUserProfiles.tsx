/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from "react";
import { firestore } from "firebase";
import { useFBCtx } from "../../context/firebase/firebaseCtx";

//
export const useUserProfiles = () => {
  const [userProfiles, setUserProfiles] = useState<{
    [uid: string]: PlayerProfile;
  }>({});
  const [userIds, setUserIds] = useState<string[]>([]);
  const { firestore: fs } = useFBCtx();

  useEffect(() => {
    if (!fs || !userIds?.length) return;
    const usersRef = fs
      .collection("users")
      .where(firestore.FieldPath.documentId(), "in", userIds);
    const unsubscribe = usersRef.onSnapshot((snap) => {
      const _userProfiles: { [uid: string]: PlayerProfile } = {};
      if (!snap.empty) {
        snap.forEach((doc) => {
          // @ts-ignore
          _userProfiles[doc.id] = doc.data();
        });
        console.log("updating profiles", _userProfiles);
        setUserProfiles(_userProfiles);
      }
    });
    return unsubscribe;
  }, [userIds]);

  return { userProfiles, setUserIds, userIds };
};
