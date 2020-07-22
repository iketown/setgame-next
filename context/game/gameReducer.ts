/* eslint-disable no-console */
import { checkSet, getSets } from "../../functions/cards/checkCards";

export const initialGameState: GameState = {
  boardCards: [],
  newCards: [],
  deckCards: [],
  cheatCards: [],
  sets: { length: 0, sets: [] },
  declaring: false,
  mySet: [],
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case "SET_MESSAGE": {
      const { message } = action.payload;
      return { ...state, message };
    }
    case "UPDATE_BOARD": {
      const {
        boardCards = state.boardCards,
        deckCards = state.deckCards,
        sets = state.sets,
        successSet = state.successSet,
      } = action.payload;
      const newCards = boardCards.filter((c) => !state.boardCards.includes(c));
      const setCount = getSets(boardCards).length;
      console.log({ setCount });
      return { ...state, boardCards, deckCards, sets, successSet, newCards };
    }
    case "CLEAR_SET": {
      return { ...state, mySet: [], cheatCards: [] };
    }
    case "TOGGLE_CARD": {
      const { card } = action.payload;
      let mySet;
      if (state.mySet.includes(card)) {
        mySet = state.mySet.filter((_card) => _card !== card);
      } else {
        mySet = [...state.mySet, card];
      }
      return { ...state, mySet };
    }
    case "TOGGLE_CHEATER": {
      const { card } = action.payload;
      let cheatCards;
      if (state.cheatCards.includes(card)) {
        cheatCards = state.cheatCards.filter((c) => c !== card);
      } else {
        cheatCards = [...state.cheatCards, card];
      }
      return { ...state, cheatCards };
    }

    default:
      return state;
  }
};
