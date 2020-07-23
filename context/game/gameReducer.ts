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
    case "REARRANGE_BOARD": {
      const { boardCards } = action.payload;
      if (!boardCards) return state;
      return { ...state, boardCards };
    }
    case "SHOW_SUCCESS_SET": {
      const { successSet } = action.payload;
      return { ...state, successSet };
    }
    case "UPDATE_BOARD": {
      const {
        boardCards = state.boardCards,
        deckCards = state.deckCards,
        sets = state.sets,
      } = action.payload;
      const newCards = boardCards.filter((c) => !state.boardCards.includes(c));
      const replacementCards = [...newCards];
      const hollowBoardCards = state.boardCards.map((c, i) =>
        boardCards.includes(c) ? c : null
      );
      let nextBoardCards = hollowBoardCards.map(
        (c) => c || replacementCards.pop()
      );
      if (!nextBoardCards.length) {
        nextBoardCards = boardCards;
      }
      return {
        ...state,
        boardCards: nextBoardCards,
        deckCards,
        sets,
        successSet: undefined,
        newCards,
      };
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
