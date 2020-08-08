type SoloGameState = {
  sets: { points: number; set: string[]; time: string }[];
  latestSetTime: string;
  bonusPoints: number;
  gameId: string;
  points: number;
};

type SoloGameActionType =
  | "SET_BONUS_POINTS"
  | "LATEST_SET_TIME"
  | "ADD_SET_TO_SCORE"
  | "PUNISH_SCORE"
  | "SET_GAMEID"
  | "LOAD_GAME";

interface SoloGamePayload {
  bonusPoints?: number;
  latestSetTime?: string;
  time?: string;
  set?: string[];
  gameId?: string;
  soloGameState?: SoloGameState;
}
interface SoloGameAction {
  type: SoloGameActionType;
  payload?: SoloGamePayload;
}

type SavedGame = {
  bonusPoints: number;
  gameId: string;
  latestSetTime: string;
  points: number;
  sets: {
    points: number;
    set: string[];
    time: string;
  }[];
  gameState: {
    boardCards: string[];
    deckCards: string[];
  };
};
