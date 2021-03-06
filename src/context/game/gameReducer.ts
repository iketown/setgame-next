/* eslint-disable no-console */

export const initialGameState: GameState = {
  boardCards: [],
  newCards: [],
  deckCards: [],
  sets: { length: 0, sets: [] },
  mySet: [],
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case "RESET_GAME": {
      return initialGameState;
    }
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
      const { successSet, playedSets } = action.payload;
      return { ...state, successSet, playedSets };
    }
    case "SET_DELAYED_STATE": {
      const { boardCards, deckCards, sets } = action.payload;
      if (!boardCards || !deckCards || !sets) return state;
      return { ...state, delayedState: { boardCards, deckCards, sets } };
    }
    case "ACTIVATE_DELAYED_STATE": {
      const { boardCards, deckCards, sets } = state.delayedState;
      if (!boardCards || !deckCards || !sets) return state;
      return { ...state, boardCards, deckCards, sets };
    }
    case "FAIL_SET": {
      const { set } = action.payload;
      return { ...state, failSet: set };
    }
    case "UPDATE_BOARD": {
      const {
        boardCards = state.boardCards,
        deckCards = state.deckCards,
        sets = state.sets,
        playedSets = state.playedSets,
      } = action.payload;
      const newCards = boardCards.filter((c) => !state.boardCards.includes(c));
      const replacementCards = [...newCards];
      const hollowBoardCards = state.boardCards.map((c) =>
        boardCards.includes(c) ? c : null
      );
      let nextBoardCards = hollowBoardCards.map(
        (c) => c || replacementCards.pop()
      );
      // if any left, put them at the end
      nextBoardCards = [...nextBoardCards, ...replacementCards]
        // and remove the gaps
        .filter((c) => !!c);
      if (!nextBoardCards.length) {
        nextBoardCards = boardCards;
      }
      return {
        ...state,
        mySet: state.mySet.filter((cardId) => nextBoardCards.includes(cardId)),
        boardCards: nextBoardCards,
        deckCards,
        sets,
        successSet: undefined,
        newCards,
        playedSets,
      };
    }
    case "CLEAR_SET": {
      return { ...state, mySet: [] };
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

    default:
      return state;
  }
};
