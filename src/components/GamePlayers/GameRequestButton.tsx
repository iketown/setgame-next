import React, { useEffect, useState } from "react";
import { useGameCtx } from "../../../context/game/GameCtx";
import { Button, CircularProgress, LinearProgress } from "@material-ui/core";
import { useGame } from "../../hooks/useGame";
import { useFBCtx } from "../../../context/firebase/firebaseCtx";

const GameRequestButton = () => {
  const { user } = useFBCtx();
  const { isPlayer, gameRef } = useGameCtx();
  const { requestToJoin } = useGame();
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (isPlayer || !gameRef || !user?.uid) return;
    const joinReqRef = gameRef.child("joinRequests");
    console.log("setting listener");
    joinReqRef.on("value", (snap) => {
      const value = snap.val();
      console.log("value", value);
      if (value && value[user.uid]) {
        const { requestTime, approved } = value[user.uid];
        setWaiting(true);
      }
    });
    return () => joinReqRef.off();
  }, [isPlayer, user, gameRef]);
  if (isPlayer) return null;
  if (!user?.uid) return null;
  return (
    <>
      <LinearProgress />
      <br />
      <Button
        onClick={() => requestToJoin()}
        variant="contained"
        color="primary"
      >
        Request to Join
      </Button>
    </>
  );
};

export default GameRequestButton;
