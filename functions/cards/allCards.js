const getOrderedCards = () => {
  const _cards = [];
  for (let color of ["r", "g", "b"]) {
    // red, green, blue
    for (let fill of ["e", "f", "s"]) {
      // empty, full, striped
      for (let quant of ["1", "2", "3"]) {
        for (let shape of ["d", "r", "s"]) {
          // diamond, round, squiggle
          _cards.push(`${color}${fill}${quant}${shape}`);
        }
      }
    }
  }
  return _cards;
};

const getMixedDeck = () => {
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

module.exports = {
  getMixedDeck,
};
