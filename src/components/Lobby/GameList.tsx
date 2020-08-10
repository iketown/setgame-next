import { List, ListSubheader } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useLobbyCtx } from "@context/lobby/LobbyCtx";
import GameListItem from "./GameListItem";

const GameList: React.FC = () => {
  const { publicGames, myGames } = useLobbyCtx();

  const gamesByStartTime =
    publicGames &&
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(publicGames).sort(([gameId, obj], [gameId2, obj2]) => {
      if (moment(obj.createdAt).isBefore(moment(obj2.createdAt))) return 1;
      return -1;
    });
  const myGameObjects = gamesByStartTime?.filter(([gameId]) =>
    myGames?.includes(gameId)
  );
  const availableGames = gamesByStartTime?.filter(
    ([gameId, publicGame]) =>
      !myGames?.includes(gameId) && publicGame.allowNewPlayers
  );
  const unavailableGames = gamesByStartTime?.filter(
    ([gameId, publicGame]) =>
      !myGames?.includes(gameId) && !publicGame.allowNewPlayers
  );
  return (
    <>
      <List dense>
        {myGameObjects?.length ? (
          <ListSubheader>MY GAMES</ListSubheader>
        ) : (
          <div />
        )}
        {myGameObjects?.map(
          ([
            gameId,
            { players, gameStartTime, createdAt, allowNewPlayers },
          ]) => {
            return (
              <GameListItem
                key={gameId}
                {...{
                  gameId,
                  players,
                  gameStartTime,
                  createdAt,
                  allowNewPlayers,
                }}
              />
            );
          }
        )}
        <ListSubheader>AVAILABLE GAMES</ListSubheader>
        {availableGames?.map(
          ([
            gameId,
            { players, gameStartTime, createdAt, allowNewPlayers },
          ]) => {
            return (
              <GameListItem
                key={gameId}
                {...{
                  gameId,
                  players,
                  gameStartTime,
                  createdAt,
                  allowNewPlayers,
                }}
              />
            );
          }
        )}
        <ListSubheader>IN PROGRESS</ListSubheader>
        {unavailableGames?.map(
          ([
            gameId,
            { players, gameStartTime, createdAt, allowNewPlayers },
          ]) => {
            return (
              <GameListItem
                key={gameId}
                {...{
                  gameId,
                  players,
                  gameStartTime,
                  createdAt,
                  allowNewPlayers,
                }}
              />
            );
          }
        )}
      </List>
    </>
  );
};

export default GameList;
