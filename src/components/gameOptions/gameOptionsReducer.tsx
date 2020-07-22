export const initialGOState: GOState = {
  dialogOpen: false,
  maxCards: 0,
};

export const gameOptionsReducer = (
  state: GOState,
  action: GOAction
): GOState => {
  switch (action.type) {
    case "OPEN_DIALOG":
      return { ...state, dialogOpen: true };
    case "CLOSE_DIALOG":
      return { ...state, dialogOpen: false };
    case "SET_OPTION":
      const { optionUpdates } = action.payload;
      if (!optionUpdates) return state;
      return { ...state, ...optionUpdates };
    default:
      return state;
  }
};
