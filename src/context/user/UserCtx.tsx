/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import firebaseScope from "firebase/app";
import { useRouter } from "next/router";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
} from "react";
import { useFBCtx } from "@context/firebase/firebaseCtx";
import {
  userReducer,
  userInitialValue,
} from "@components/UserSettings/userReducer";

type UserCtxType = {
  user: firebaseScope.User;
  userProfile: PlayerProfile;
  userState: UserState;
  userDispatch: React.Dispatch<UserAction>;
  updateUserPrefs: (updateObj: { [key: string]: string | number }) => void;
  handleSignOut: () => void;
  tooltipId: string;
  setTooltipId: React.Dispatch<React.SetStateAction<string>>;
  setLocation: () => void;
};

const UserCtx = createContext<Partial<UserCtxType>>({});

export const UserCtxProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userState, userDispatch] = useReducer(userReducer, userInitialValue);
  const [tooltipId, setTooltipId] = useState("");
  const { firestore, db, firebase } = useFBCtx();
  const router = useRouter();

  const setLocation = useCallback(() => {
    if (!user?.uid) return null;
    const location = router.query?.gameId || router.query?.soloGameId || "?";
    return db.ref(`/status/${user.uid}`).update({ location });
  }, [router.query, user]);

  useEffect(() => {
    // setLocation when user moves to different games etc.
    setLocation();
  }, [router, user]);

  useEffect(() => {
    const location = router.query?.gameId || router.query?.soloGameId || "?";
    const isOffline = {
      state: "offline",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    const isOnline = {
      state: "online",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
      location,
    };
    const presenceRef = db.ref(".info/connected");
    // Listen authenticated user
    const unsubscriber = firebase
      .auth()
      .onAuthStateChanged(async (_user: firebaseScope.User) => {
        try {
          if (_user?.uid) {
            const userStatusDBRef = db.ref(`/status/${_user.uid}`);
            setUser(_user);
            presenceRef.on("value", (snap) => {
              if (!snap.val()) return;
              userStatusDBRef
                .onDisconnect()
                .set(isOffline)
                .then(async () => {
                  userStatusDBRef.set(isOnline);
                });
            });
          } else {
            setUser(null);
            setUserProfile(null);
          }
        } catch (error) {
          // Most probably a connection error. Handle appropriately.
          console.error("connection error", error);
        } finally {
          // setLoadingUser(false);
        }
      });
    return () => {
      if (unsubscriber) unsubscriber();
      if (presenceRef.off) presenceRef.off();
    };
  }, [firebase, router.query]);

  const handleSignOut = useCallback(async () => {
    const isOffline = {
      state: "offline",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    if (user) {
      await db.ref(`/status/${user.uid}`).set(isOffline);
    }
    firebase.auth().signOut();
    userDispatch({ type: "CLOSE_SETTINGS" });
  }, [user, db]);

  // user profile listener
  useEffect(() => {
    if (!user?.uid) return;
    const userProfileRef = firestore.doc(`users/${user.uid}`);
    const setupProfile = async (userFull) => {
      const {
        uid,
        photoURL = "noPhoto",
        displayName = "noDisplayName",
        email = "noEmail",
      } = userFull;
      await userProfileRef.set({ uid, photoURL, displayName, email });
    };
    const unsub = userProfileRef.onSnapshot((doc) => {
      if (!doc.exists) {
        setupProfile(user);
      }
      setUserProfile(doc.data());
    });
    return unsub;
  }, [user]);

  const updateUserPrefs = useCallback(
    async (updateObj: { [key: string]: string | number }) => {
      if (!user?.uid) {
        console.log("no user");
        return;
      }
      const userProfileRef = firestore.doc(`users/${user.uid}`);
      const response = await userProfileRef.set(updateObj, { merge: true });
      return response;
    },
    [user]
  );
  return (
    <UserCtx.Provider
      value={{
        user,
        userProfile,
        userState,
        userDispatch,
        updateUserPrefs,
        handleSignOut,
        tooltipId,
        setTooltipId,
        setLocation,
      }}
      {...{ children }}
    />
  );
};

export const useUserCtx = (): Partial<UserCtxType> => useContext(UserCtx);
