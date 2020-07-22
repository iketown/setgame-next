/* eslint-disable consistent-return */
import { Button, LinearProgress } from "@material-ui/core";
import { useUserCtx } from "context/user/UserCtx";
import React, { useEffect, useState } from "react";

import { useGameCtx } from "../../../context/game/GameCtx";
import { useGame } from "../../hooks/useGame";

const GameRequestButton = () => {
  const { user } = useUserCtx();
  const { isPlayer, gameRef } = useGameCtx();
  const { requestToJoin } = useGame();

  useEffect(() => {
    if (isPlayer || !gameRef || !user?.uid) return;
    const joinReqRef = gameRef.child("joinRequests");
    joinReqRef.on("value", (snap) => {
      const value = snap.val();
      if (value && value[user.uid]) {
        const { requestTime, approved } = value[user.uid];
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
