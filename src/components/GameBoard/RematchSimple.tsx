import { useGameCtx } from "@context/game/GameCtx";
import { useGame } from "@hooks/useGame";
import { useRematch } from "@hooks/useRematch";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import RematchCountdown from "./RematchCountdown";

//
//
const RematchSimple: React.FC = () => {
  const { makeRematch } = useGame();
  const { dispatch } = useGameCtx();
  const router = useRouter();
  const { rematch } = useRematch();
  const nextGameId = rematch?.nextGameId;
  const nextGameStart = rematch?.nextGameStart;

  const handleMakeRematch = () => {
    if (nextGameId) makeRematch(nextGameId);
  };
  const navToNextGame = () => {
    dispatch({ type: "RESET_GAME", payload: {} });
    router.push(`/games/[gameId]`, `/games/${nextGameId}`);
  };

  return (
    <div>
      {nextGameStart ? (
        <Button
          onClick={navToNextGame}
          variant="contained"
          color="primary"
          size="large"
        >
          Go to Rematch
        </Button>
      ) : (
        <Button
          onClick={handleMakeRematch}
          variant="outlined"
          color="primary"
          size="large"
        >
          Rematch ?
        </Button>
      )}
      {nextGameStart && (
        <RematchCountdown
          nextGameStart={nextGameStart}
          autoNavToGame={navToNextGame}
        />
      )}
    </div>
  );
};

export default RematchSimple;
