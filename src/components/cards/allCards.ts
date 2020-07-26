/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
const getOrderedCards = () => {
  const _cards = [];
  for (const color of ["r", "g", "b"]) {
    // red, green, blue
    for (const fill of ["e", "f", "s"]) {
      // empty, full, striped
      for (const quant of ["1", "2", "3"]) {
        for (const shape of ["d", "r", "s"]) {
          // diamond, round, squiggle
          _cards.push(`${color}${fill}${quant}${shape}`);
        }
      }
    }
  }
  return _cards;
};

export const getMixedDeck = (): string[] => {
  const allCards = getOrderedCards();
  const length = allCards.length - 1;
  for (let i = length; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = allCards[i];
    allCards[i] = allCards[j];
    allCards[j] = temp;
  }
  return allCards;
};

export default getMixedDeck;
