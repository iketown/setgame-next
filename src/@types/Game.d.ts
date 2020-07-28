type GameState = {
  boardCards: string[];
  deckCards: string[];
  cheatCards: string[];
  successSet?: SuccessSet;
  failSet?: string[];
  newCards?: string[];
  sets: { length: 0; sets: string[][] };
  mySet: string[];
  declaring: boolean;
  message?: GameMessage | null;
  playedSets?: PlayedSets;
  delayedState?: {
    boardCards: string[];
    deckCards: string[];
    sets: { length: 0; sets: string[][] };
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
  | "TOGGLE_CARD"
  | "CLEAR_SET"
  | "CANCEL_SET"
  | "UPDATE_BOARD"
  | "SHOW_SUCCESS_SET"
  | "REARRANGE_BOARD"
  | "SET_MESSAGE"
  | "TOGGLE_HIDE"
  | "TOGGLE_EXTRA"
  | "TOGGLE_CHEATER"
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
  sets?: { length: 0; sets: string[][] };
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
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  optionsState: GOState;
  optionsDispatch: React.Dispatch<GOAction>;
  playerProfiles?: { [uid: string]: PlayerProfile };
  gameRequests?: GameRequests;
  gameOver?: boolean;
  gameStartTime?: false | string;
  readyToStart: boolean;
  invalidName: boolean;
};

interface GameRequests {
  [uid: string]: { requestTime: string; requesterProfile: PlayerProfile };
}

interface PlayedSets {
  [uid: string]: { playedAt: string; set: string[] }[];
}
