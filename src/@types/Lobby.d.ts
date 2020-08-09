type LobbyCtxType = {
  publicGames: { [gameId: string]: PublicGame };
  myGames: string[];
};

interface PublicGame {
  createdAt: string;
  gameStartTime: false | string;
  allowNewPlayers: boolean;
  players: {
    [uid: string]: {
      joinedAt: string;
    };
  };
}
