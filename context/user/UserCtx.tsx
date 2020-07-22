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
  userProfile: UserProfile;
  userState: UserState;
  userDispatch: React.Dispatch<UserAction>;
  updateUserPrefs: (updateObj: { [key: string]: string | number }) => void;
};

const UserCtx = createContext<Partial<UserCtxType>>({});

export const UserCtxProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userState, userDispatch] = useReducer(userReducer, userInitialValue);
  const [isConnected, setIsConnected] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const { firestore, db, firebase } = useFBCtx();

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase
      .auth()
      .onAuthStateChanged(async (user: firebaseScope.User) => {
        try {
          if (user) {
            setUser(user);
          } else setUser(null);
        } catch (error) {
          // Most probably a connection error. Handle appropriately.
        } finally {
          setLoadingUser(false);
        }
      });
    return () => unsubscriber();
  }, []);

  // user profile listener
  useEffect(() => {
    if (!user?.uid) return;
    const userProfileRef = firestore.doc(`users/${user.uid}`);
    const setupProfile = async (userFull) => {
      const {
        uid,
        photoURL = "noPhoto",
        displayName = "noDisplayName",
      } = userFull;
      await userProfileRef.set({ uid, photoURL, displayName });
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

  useEffect(() => {
    const connectedRef = db.ref(".info/connected");
    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });
  }, []);

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
      value={{ user, userProfile, userState, userDispatch, updateUserPrefs }}
      {...{ children }}
    />
  );
};

export const useUserCtx = () => useContext(UserCtx);
