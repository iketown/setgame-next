import { useState, useEffect, createContext, useContext } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/functions";
import "firebase/auth"; // If you need it
import "firebase/firestore"; // If you need it
import "firebase/storage"; // If you need it
import "firebase/analytics"; // If you need it

type FirebaseCtxType = {
  firebase: typeof firebase;
  user: firebase.User;
  userProfile: UserProfile;
  db: firebase.database.Database;
  firestore: firebase.firestore.Firestore;
  functions: firebase.functions.Functions;
};

export const FirebaseCtx = createContext<Partial<FirebaseCtxType>>({});

export let clientCredentials = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

let fbConfig = clientCredentials;

let useLocalEmulators = false;
if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  useLocalEmulators = true;
}
if (useLocalEmulators)
  fbConfig.databaseURL = "http://localhost:9000/?ns=setgame-iketown";

if (!firebase.apps.length) {
  firebase.initializeApp(fbConfig);
}

if (useLocalEmulators) {
  console.log("using EMULATORS");
  firebase.functions().useFunctionsEmulator("http://localhost:5001");
  firebase.firestore().settings({
    host: "localhost:8080",
    ssl: false,
  });
}

export const FirebaseCtxProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.
  const db = firebase.database();
  const firestore = firebase.firestore();
  const functions = firebase.functions();
  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // User is signed in.
          const { uid, displayName, email, photoURL } = user;
          console.log("user is signed in", user);
          const _userProfile = await firestore
            .doc(`users/${uid}`)
            .get()
            .then((doc) => doc.data());
          console.log("_userProfile", _userProfile);
          if (!_userProfile || !_userProfile.exists) {
            // create minimal user Profile
            firestore
              .doc(`users/${uid}`)
              .set({ displayName, photoURL }, { merge: true });
          }
          setUser({ uid, displayName, email, photoURL });
          setUserProfile(_userProfile);
        } else setUser(null);
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return (
    <FirebaseCtx.Provider
      value={{ user, userProfile, firebase, db, firestore, functions }}
    >
      {children}
    </FirebaseCtx.Provider>
  );
};

// Custom hook that shorhands the context!
export const useFBCtx = () => useContext(FirebaseCtx);
