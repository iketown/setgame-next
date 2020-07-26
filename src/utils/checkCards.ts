/* eslint-disable no-plusplus */

// find 3rd card
const colors = ["r", "g", "b"];
const fills = ["e", "f", "s"];
const quants = ["1", "2", "3"];
const shapes = ["d", "r", "s"];
const options = [colors, fills, quants, shapes];

export function getThirdCard(
  card1: string | null,
  card2: string | null
): string | null {
  if (!card1 || !card2) return null;
  const card3: string[] = [];
  for (let i = 0; i < card1.length; i++) {
    if (card1[i] === card2[i]) {
      card3[i] = card1[i];
    } else {
      card3[i] =
        options[i].find((opt) => opt !== card1[i] && opt !== card2[i]) || "x";
    }
  }
  return card3.join("");
}

// make sure set is correct

export function checkSet(card1: string, card2: string, card3: string): boolean {
  return getThirdCard(card1, card2) === card3;
}

// find all sets on board
export function getSets(cards: (string | null)[]): string[][] {
  const sets = [];
  for (let i = 0; i < cards.length - 2; i++) {
    const card1 = cards[i];
    for (let j = i + 1; j < cards.length - 1; j++) {
      const card2 = cards[j];
      const card3 = getThirdCard(card1, card2);
      const isASet = cards.slice(j).includes(card3);
      if (!!card1 && !!card2 && !!card3 && isASet) {
        sets.push([card1, card2, card3]);
      }
    }
  }
  return sets;
}
