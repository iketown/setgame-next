type Game = {
  playerIds: string[];
  onBoard: string[];
  inDeck: string[];
  score: { [playerId: string]: number };
};
