type GameState = {
  boardCards: string[];
  deckCards: string[];
  successSet?: SuccessSet;
  failSet?: string[];
  newCards?: string[];
  sets: { length: number; sets: string[][] };
  mySet: string[];
  message?: GameMessage | null;
  playedSets?: PlayedSets;
  delayedState?: {
    boardCards: string[];
    deckCards: string[];
    sets: { length: number; sets: string[][] };
  };
};
interface SuccessSet {
  set: string[];
  playedAt: string;
  uid: string;
}
interface GameAction {
  type: GameActionType;
  payload: GameActionPayload;
}

type GameActionType =
  | "RESET_GAME"
  | "TOGGLE_CARD"
  | "CLEAR_SET"
  | "CANCEL_SET"
  | "UPDATE_BOARD"
  | "SHOW_SUCCESS_SET"
  | "REARRANGE_BOARD"
  | "SET_MESSAGE"
  | "TOGGLE_HIDE"
  | "TOGGLE_EXTRA"
  | "FAIL_SET"
  | "SET_DELAYED_STATE"
  | "ACTIVATE_DELAYED_STATE";

interface GameMessage {
  type: "NO_GAME_FOUND" | "NOT_A_SET" | "NOT_A_PLAYER";
  message: string;
  timeout?: number;
}

interface GameActionPayload {
  card?: string;
  set?: string[];
  sets?: { length: number; sets: string[][] };
  boardCards?: string[];
  deckCards?: string[];
  message?: GameMessage;
  successSet?: SuccessSet;
  playedSets?: PlayedSets;
}

type GameContextType = {
  gameId: string;
  setGameId: React.Dispatch<React.SetStateAction<string>>;
  isGameAdmin: boolean;
  isPlayer: boolean;
  setIsPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  optionsState: GOState;
  optionsDispatch: React.Dispatch<GOAction>;
  playerProfiles?: { [uid: string]: PlayerProfile };
  gameRequests?: GameRequests;
  gameOver?: false | string;
  setGameOver?: React.Dispatch<React.SetStateAction<string | false>>;
  gameStartTime?: false | string;
  gameEnded?: false | string;
  invalidName: boolean;
  allowsNewPlayers: boolean;
};

interface GameRequests {
  [uid: string]: { requestTime: string; requesterProfile: PlayerProfile };
}

interface PlayedSets {
  [uid: string]: { playedAt: string; set: string[] }[];
}

interface RematchType {
  nextGameId: string;
  nextGameStart: false | string;
}
