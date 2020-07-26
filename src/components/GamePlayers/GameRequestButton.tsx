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
      <br />
      <Button
        onClick={() => {
          requestToJoin();
        }}
        variant="contained"
        color="primary"
        disabled={isWaiting}
      >
        Request to Join
        {isWaiting && (
          <>
            <LinearProgress
              style={{ left: 0, right: 0, position: "absolute", top: -5 }}
            />
            <LinearProgress
              style={{ left: 0, right: 0, position: "absolute", bottom: -5 }}
            />
          </>
        )}
      </Button>
    </>
  );
};

export default GameRequestButton;
