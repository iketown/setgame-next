type LobbyCtxType = {
  getUniqueName: () => void;
  uniqueName: { name: string };
  publicGames: { [gameId: string]: PublicGame };
};

interface PublicGame {
  createdAt: string;
  gameStartTime: false | string;
  invites?: {
    [uid: string]: {
      invitedBy: string;
      time: string;
    };
  };
  players: {
    [uid: string]: {
      joinedAt: string;
      playerProfile: PlayerProfile;
    };
  };
}
