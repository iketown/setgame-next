import { useState, useEffect, createContext, useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth"; // If you need it
import "firebase/firestore"; // If you need it
import "firebase/storage"; // If you need it
import "firebase/analytics"; // If you need it

type FirebaseCtxType = {
  firebase: typeof firebase;
  user: firebase.User;
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

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
  // To enable analytics. https://firebase.google.com/docs/analytics/get-started
  // if ("measurementId" in clientCredentials) firebase.analytics();
}

export const FirebaseCtxProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // User is signed in.
          const { uid, displayName, email, photoURL } = user;
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser({ uid, displayName, email, photoURL });
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
    <FirebaseCtx.Provider value={{ user, firebase }}>
      {children}
    </FirebaseCtx.Provider>
  );
};

// Custom hook that shorhands the context!
export const useFBCtx = () => useContext(FirebaseCtx);
