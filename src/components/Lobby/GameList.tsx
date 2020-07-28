import { List } from "@material-ui/core";
import moment from "moment";
import React from "react";

import { useLobbyCtx } from "../../../context/lobby/LobbyCtx";
import GameListItem from "./GameListItem";

const GameList = () => {
  const { publicGames } = useLobbyCtx();
  const gamesByStartTime =
    publicGames &&
    Object.entries(publicGames).sort(([gameId, obj], [gameId2, obj2]) => {
      if (moment(obj.createdAt).isBefore(moment(obj2.createdAt))) return 1;
      return -1;
    });
  return (
    <List dense>
      {gamesByStartTime &&
        gamesByStartTime.map(
          ([gameId, { players, gameStartTime, createdAt }]) => {
            return (
              <GameListItem
                key={gameId}
                {...{ gameId, players, gameStartTime, createdAt }}
              />
            );
          }
        )}
    </List>
  );
};

export default GameList;
