import { List, ListSubheader } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useLobbyCtx } from "@context/lobby/LobbyCtx";
import GameListItem from "./GameListItem";

const GameList: React.FC = () => {
  const { publicGames } = useLobbyCtx();
  const gamesByStartTime =
    publicGames &&
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(publicGames).sort(([gameId, obj], [gameId2, obj2]) => {
      if (moment(obj.createdAt).isBefore(moment(obj2.createdAt))) return 1;
      return -1;
    });
  return (
    <List dense subheader={<ListSubheader>CURRENT GAMES</ListSubheader>}>
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
