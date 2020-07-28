/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import firebaseScope from "firebase/app";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
} from "react";
import { useFBCtx } from "context/firebase/firebaseCtx";
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
};

const UserCtx = createContext<Partial<UserCtxType>>({});

export const UserCtxProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userState, userDispatch] = useReducer(userReducer, userInitialValue);
  const [isConnected, setIsConnected] = useState(false);
  // const [loadingUser, setLoadingUser] = useState(true);
  const { firestore, db, firebase } = useFBCtx();

  useEffect(() => {
    const isOffline = {
      state: "offline",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    const isOnline = {
      state: "online",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    const presenceRef = db.ref(".info/connected");
    // Listen authenticated user
    const unsubscriber = firebase
      .auth()
      .onAuthStateChanged(async (_user: firebaseScope.User) => {
        try {
          if (_user) {
            const userStatusDBRef = db.ref(`/status/${_user?.uid}`);
            setUser(_user);
            presenceRef.on("value", (snap) => {
              if (!snap.val()) return;
              userStatusDBRef
                .onDisconnect()
                .set(isOffline)
                .then(() => {
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
      unsubscriber();
      presenceRef.off();
    };
  }, []);

  const handleSignOut = useCallback(async () => {
    const isOffline = {
      state: "offline",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    console.log("handleSignOut", { user });
    if (user) {
      await db.ref(`/status/${user.uid}`).set(isOffline);
    }
    firebase.auth().signOut();
  }, [user, db]);

  // user profile listener
  useEffect(() => {
    if (!user?.uid) return;
    const userProfileRef = firestore.doc(`users/${user.uid}`);
    const setupProfile = async (userFull) => {
      console.log("setting profile", userFull);
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
        console.log("setting up profile 1st time");
        setupProfile(user);
      }
      setUserProfile(doc.data());
    });
    return unsub;
  }, [user]);

  // useEffect(() => {
  //   const connectedRef = db.ref(".info/connected");
  //   connectedRef.on("value", (snap) => {
  //     if (snap.val() === true) {
  //       setIsConnected(true);
  //     } else {
  //       setIsConnected(false);
  //     }
  //   });
  // }, []);

  const updateUserPrefs = useCallback(
    async (updateObj: { [key: string]: string | number }) => {
      if (!user?.uid) {
        console.log("no user");
        return;
      }
      const userProfileRef = firestore.doc(`users/${user.uid}`);
      const response = await userProfileRef.set(updateObj, { merge: true });
      console.log("response", response);
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
      }}
      {...{ children }}
    />
  );
};

export const useUserCtx = () => useContext(UserCtx);
