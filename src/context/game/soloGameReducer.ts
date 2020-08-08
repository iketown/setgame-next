export const initialState: SoloGameState = {
  sets: [],
  latestSetTime: "",
  bonusPoints: 6,
  gameId: "",
  points: 0,
};

export const soloGameReducer = (
  state: SoloGameState,
  action: SoloGameAction
): SoloGameState => {
  // console.log({ action });
  switch (action.type) {
    case "LATEST_SET_TIME": {
      const { latestSetTime } = action.payload;
      if (!latestSetTime) return state;
      return { ...state, latestSetTime };
    }
    case "SET_BONUS_POINTS": {
      const { bonusPoints } = action.payload;
      if (typeof bonusPoints !== "number") return state;
      return { ...state, bonusPoints };
    }
    case "ADD_SET_TO_SCORE": {
      const { bonusPoints, points } = state;
      const { set, time } = action.payload;
      if (!time || !set) return state;
      if (state.sets.find((stateSet) => stateSet.time === time)) return state;
      const thisScore = bonusPoints + 3;
      const thisSet = { time, set, points: thisScore };
      const sets = [thisSet, ...state.sets];
      return { ...state, points: points + thisScore, sets };
    }
    case "PUNISH_SCORE": {
      const { points } = state;
      return { ...state, points: points - 3 };
    }
    case "SET_GAMEID": {
      const { gameId } = action.payload;
      if (typeof gameId !== "string") return state;
      return { ...initialState, gameId };
    }
    case "LOAD_GAME": {
      const { soloGameState } = action.payload;
      if (!soloGameState) return state;
      return soloGameState;
    }
    default:
      return state;
  }
};
