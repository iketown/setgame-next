// make sure set is correct
function checkSet(card1, card2, card3) {
  return getThirdCard(card1, card2) === card3;
}

// find all sets on board
function getSets(cards) {
  const sets = [];
  for (let i = 0; i < cards.length - 2; i++) {
    const card1 = cards[i];
    for (let j = i + 1; j < cards.length - 1; j++) {
      const card2 = cards[j];
      const card3 = getThirdCard(card1, card2);
      const isASet = cards.slice(j + 1).includes(card3);
      if (isASet) {
        sets.push([card1, card2, card3]);
      }
    }
  }
  return sets;
}

// find 3rd card
const colors = ["r", "g", "b"];
const fills = ["e", "f", "s"];
const quants = ["1", "2", "3"];
const shapes = ["e", "r", "s"];
const options = [colors, fills, quants, shapes];

function getThirdCard(card1, card2) {
  const card3 = [];
  for (let i in card1) {
    if (card1[i] === card2[i]) {
      card3[i] = card1[i];
    } else {
      card3[i] = options[i].find((opt) => opt !== card1[i] && opt !== card2[i]);
    }
  }
  return card3.join("");
}

module.exports = { checkSet, getThirdCard, getSets };
