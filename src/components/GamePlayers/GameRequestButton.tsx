/* eslint-disable consistent-return */
import { Button, LinearProgress } from "@material-ui/core";
import { useUserCtx } from "context/user/UserCtx";
import React from "react";

import { useGameCtx } from "../../../context/game/GameCtx";
import { useGame } from "../../hooks/useGame";

const GameRequestButton = () => {
  const { user } = useUserCtx();
  const { isPlayer, gameRequests } = useGameCtx();
  const { requestToJoin } = useGame();

  if (isPlayer) return null;
  if (!user?.uid) return null;
  const isWaiting = !!(gameRequests && gameRequests[user.uid]);
  return (
    <>
      {isWaiting && <LinearProgress />}
      <br />
      <Button
        onClick={() => requestToJoin()}
        variant="contained"
        color="primary"
        disabled={isWaiting}
      >
        Request to Join
      </Button>
    </>
  );
};

export default GameRequestButton;
