import firebase from "firebase";
import React, { useState } from "react";
import StyledFBAuth from "react-firebaseui/StyledFirebaseAuth";

import { useFBCtx } from "../../context/firebase/firebaseCtx";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccessUrl: "/signedIn",
  callbacks: {
    signInSuccessWithAuthResult: (auth) => {
      console.log("signinsuccess", auth);
      return false;
    },
  },
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

const SignInScreen = () => {
  const { firebase: fb } = useFBCtx();

  return (
    <div>
      <StyledFBAuth uiConfig={uiConfig} firebaseAuth={fb.auth()} />
    </div>
  );
};

export default SignInScreen;
