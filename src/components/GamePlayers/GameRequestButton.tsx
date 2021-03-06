/* eslint-disable consistent-return */
import { Button, LinearProgress, Typography } from "@material-ui/core";
import { useUserCtx } from "@context/user/UserCtx";
import React from "react";

import { useGameInvites } from "@hooks/useGameInvites";
import { useGameCtx } from "@context/game/GameCtx";

const GameRequestButton: React.FC = () => {
  const { user } = useUserCtx();
  const { isPlayer, allowsNewPlayers } = useGameCtx();
  const { requestToJoin, cancelRequestToJoin } = useGameInvites();
  const { gameRequests } = useGameInvites();
  if (isPlayer) return null;
  if (!user?.uid) return null;

  const isWaiting = !!(gameRequests && gameRequests[user.uid]);
  const handleClick = () => {
    if (isWaiting) {
      cancelRequestToJoin();
    } else {
      requestToJoin();
    }
  };
  return (
    <>
      <br />
      {isWaiting && (
        <Typography variant="caption" color="textSecondary" gutterBottom>
          waiting for response. . .
        </Typography>
      )}
      {allowsNewPlayers ? (
        <Button
          onClick={handleClick}
          variant="contained"
          color={isWaiting ? "secondary" : "primary"}
        >
          {isWaiting ? "cancel request" : "Request to Join"}
          {isWaiting && (
            <LinearProgress
              style={{ left: 0, right: 0, position: "absolute", bottom: -5 }}
            />
          )}
        </Button>
      ) : (
        <Typography variant="caption">not allowing new players</Typography>
      )}
    </>
  );
};

export default GameRequestButton;
