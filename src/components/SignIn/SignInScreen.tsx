import firebase from "firebase";
import React, { useState } from "react";
import StyledFBAuth from "react-firebaseui/StyledFirebaseAuth";
import { useUserCtx } from "context/user/UserCtx";
import { useFBCtx } from "../../../context/firebase/firebaseCtx";

const SignInScreen = () => {
  const { firebase: fb } = useFBCtx();
  const { userDispatch } = useUserCtx();
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    callbacks: {
      signInSuccessWithAuthResult: (auth) => {
        userDispatch({ type: "CLOSE_SETTINGS" });
        return false;
      },
    },
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };
  return (
    <div>
      <StyledFBAuth uiConfig={uiConfig} firebaseAuth={fb.auth()} />
    </div>
  );
};

export default SignInScreen;
