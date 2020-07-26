import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useFBCtx } from "context/firebase/firebaseCtx";
import useGame from "@hooks/useGame";
import Link from "next/link";
import { GameCtxProvider, useGameCtx } from "context/game/GameCtx";

const PreGame = () => {
  const router = useRouter();
  const { gameId, setGameId } = useGameCtx();

  console.log("pregame router", router);
  const { fastCreateGame } = useGame();

  return (
    <div>
      I am Pregame {router.query.pregameId}
      <h3>gameId: {gameId}</h3>
    </div>
  );
};

const WrappedPreGame = () => {
  return (
    <GameCtxProvider>
      <PreGame />
    </GameCtxProvider>
  );
};

export default WrappedPreGame;
