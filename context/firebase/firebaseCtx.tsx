import React, { useState, useEffect, createContext, useContext } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/functions";
import "firebase/auth"; // If you need it
import "firebase/firestore"; // If you need it
import "firebase/storage"; // If you need it
import "firebase/analytics"; // If you need it

type FirebaseCtxType = {
  firebase: typeof firebase;

  db: firebase.database.Database;
  firestore: firebase.firestore.Firestore;
  functions: firebase.functions.Functions;
};

export const FirebaseCtx = createContext<Partial<FirebaseCtxType>>({});

export const clientCredentials = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const fbConfig = clientCredentials;

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
  firebase.functions().useFunctionsEmulator("http://localhost:5001");
  firebase.firestore().settings({
    host: "localhost:8080",
    ssl: false,
  });
}

export const FirebaseCtxProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);

  const db = firebase.database();

  const firestore = firebase.firestore();
  const functions = firebase.functions();

  return (
    <FirebaseCtx.Provider value={{ firebase, db, firestore, functions }}>
      {children}
    </FirebaseCtx.Provider>
  );
};

// Custom hook that shorhands the context!
export const useFBCtx = () => useContext(FirebaseCtx);
