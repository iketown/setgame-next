type UserProfile = {
  displayName?: string;
  photoURL?: string;
  userColor: string;
};

type UserState = {
  dialogOpen: boolean;
};

interface UserAction {
  type: "OPEN_SETTINGS" | "CLOSE_SETTINGS";
  payload?: UserPayload;
}

interface UserPayload {
  uid?: string;
}
