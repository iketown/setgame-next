type PlayerProfile = {
  uid: string;
  displayName: string;
  photoURL?: string;
  userColor?: PlayerColorOption;
  faceImageNumber?: number;
  singleClickToSelect?: boolean;
  friends?: { [uid: string]: string }; // last time you played
};

type GamePlayer = {
  admin: boolean;
  joinedAt: string;
};

interface PlayerRequest {
  requestTime: string;
  approved: boolean;
}

interface PlayerColor {
  name: PlayerColorOption;
  light: string;
  med: string;
  dark: string;
}

type PlayerColorOption = "grey" | "red" | "green" | "orange" | "cyan";

type FriendGameRecord = {
  gameDate: string;
  gameId: string;
};
