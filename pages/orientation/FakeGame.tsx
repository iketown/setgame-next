import React from "react";
import GameBoard from "@components/GameBoard/GameBoard";
import NotASet from "@components/GameMessages/NotASet";
import { useSetListener } from "@hooks/useSetListener";
import { GameCtxProvider } from "../../src/context/game/GameCtx";

const FakeGame = () => {
  const submitSetApi = async ({ mySet }) => {
    // handle success here.

    return new Promise((resolve) => {
      setTimeout(() => {
        // clear success here.
        console.log("success!", mySet);
        resolve();
      }, 2000);
    });
  };
  useSetListener({ submitSetApi });
  return (
    <>
      <GameBoard key="gameboard" />
      <NotASet />
    </>
  );
};

const FakeGameWrapper: React.FC = () => {
  const boardCards = ["rf2s", "re3s", "rs1s", "be1d", "rf2d", "gs3d"];
  return (
    <GameCtxProvider
      key={boardCards.join("")}
      initialBoardCards={boardCards}
      isTraining
    >
      <FakeGame />
    </GameCtxProvider>
  );
};

export default FakeGameWrapper;
