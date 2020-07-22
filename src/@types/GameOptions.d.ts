type GOState = {
  dialogOpen: boolean;
  maxCards: number;
};

interface GOAction {
  type: "OPEN_DIALOG" | "CLOSE_DIALOG" | "SET_OPTION";
  payload?: GOPayload;
}

interface GOPayload {
  maxCards?: number;
  optionUpdates?: { [key: string]: string | number };
}
