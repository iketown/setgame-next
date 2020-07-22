export const userInitialValue: UserState = {
  dialogOpen: false,
};

export const userReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case "OPEN_SETTINGS": {
      return { ...state, dialogOpen: true };
    }
    case "CLOSE_SETTINGS": {
      return { ...state, dialogOpen: false };
    }
    default:
      return state;
  }
};
