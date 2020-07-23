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
