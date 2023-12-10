import {readFileSync} from 'fs';

type Hand = {
  cards: string[];
  orderedCards: string[];
  bid: number;
  strength: string;
};

const CARD_ORDER = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const CARD_ORDER_JOKERS = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
const HAND_ORDER = ['high', 'pair', 'twoPair', 'three', 'full', 'four', 'five'];

const isFive = (cards: string[]) => cards.every((c) => c === cards[0]);
const isFour = (cards: string[]) => {
  return (
    (cards[0] === cards[1] && cards[0] === cards[2] && cards[0] === cards[3]) ||
    (cards[1] === cards[2] && cards[1] === cards[3] && cards[1] === cards[4])
  );
};

const isFull = (cards: string[]) => {
  return (
    (cards[0] === cards[1] && cards[0] === cards[2] && cards[3] === cards[4]) ||
    (cards[0] === cards[1] && cards[2] === cards[3] && cards[2] === cards[4])
  );
};

const isThree = (cards: string[]) => {
  return (
    (cards[0] === cards[1] && cards[0] === cards[2]) ||
    (cards[1] === cards[2] && cards[1] === cards[3]) ||
    (cards[2] === cards[3] && cards[2] === cards[4])
  );
};

const isTwoPair = (cards: string[]) => {
  return (
    (cards[0] === cards[1] && cards[2] === cards[3]) ||
    (cards[0] === cards[1] && cards[3] === cards[4]) ||
    (cards[1] === cards[2] && cards[3] === cards[4])
  );
};

const isPair = (cards: string[]) => {
  return (
    cards[0] === cards[1] || cards[1] === cards[2] || cards[2] === cards[3] || cards[3] === cards[4]
  );
};

const sortByStrength = (a: Hand, b: Hand, jokers = false) => {
  const strengthA = a.strength;
  const strengthB = b.strength;
  const cardOrder = jokers ? CARD_ORDER_JOKERS : CARD_ORDER;

  const order = HAND_ORDER.indexOf(strengthA) - HAND_ORDER.indexOf(strengthB);
  if (!order) {
    for (let i = 0; i < 5; i++) {
      const cardA = a.cards[i];
      const cardB = b.cards[i];
      const order = cardOrder.indexOf(cardA) - cardOrder.indexOf(cardB);
      if (order) {
        return order;
      }
    }
  }
  return order;
};

const cardStrength = (orderedCards: string[]) => {
  let strength = 'high';

  if (isFive(orderedCards)) {
    strength = 'five';
  } else if (isFour(orderedCards)) {
    strength = 'four';
  } else if (isFull(orderedCards)) {
    strength = 'full';
  } else if (isThree(orderedCards)) {
    strength = 'three';
  } else if (isTwoPair(orderedCards)) {
    strength = 'twoPair';
  } else if (isPair(orderedCards)) {
    strength = 'pair';
  }

  return strength;
};

const replaceJokers = (cards: string[], replacement: string) => {
  return cards.reduce<string[]>((acc, card) => {
    if (card === 'J') {
      acc.push(replacement);
    } else {
      acc.push(card);
    }
    return acc;
  }, []);
};

const getHands = (input: string, jokers = false) => {
  return input.split('\n').map<Hand>((line) => {
    const temp = line.split(' ');
    const cards = temp[0].split('');
    let orderedCards = [...cards].sort((a, b) => CARD_ORDER.indexOf(a) - CARD_ORDER.indexOf(b));
    const bid = Number(temp[1]);
    let strength = cardStrength(orderedCards);
    if (jokers) {
      const jokerCount = orderedCards.filter((c) => c === 'J').length;
      if (jokerCount) {
        let replacement = 'A';
        if (strength === 'three' && jokerCount === 1) {
          for (const card of orderedCards) {
            if (orderedCards.filter((c) => c === card).length > 1) {
              replacement = card;
              break;
            }
          }
        } else if (
          (strength === 'twoPair' && jokerCount > 1) ||
          (strength === 'pair' && jokerCount === 1)
        ) {
          for (const card of orderedCards) {
            if (orderedCards.filter((c) => c !== 'J' && c === card).length === 2) {
              replacement = card;
              break;
            }
          }
        } else if (strength !== 'five') {
          replacement = orderedCards.find((c) => c !== 'J')!;
        }
        orderedCards = replaceJokers(orderedCards, replacement);
      }
      orderedCards = [...orderedCards].sort(
        (a, b) => CARD_ORDER.indexOf(a) - CARD_ORDER.indexOf(b),
      );
      strength = cardStrength(orderedCards);
    }
    return {cards, orderedCards, strength, bid};
  });
};

export const part1 = (input: string) => {
  const hands = getHands(input);
  let result = 0;

  hands.sort(sortByStrength);

  let rank = 1;
  for (const hand of hands) {
    result += hand.bid * rank;
    rank++;
  }
  return result;
};

export const part2 = (input: string) => {
  const hands = getHands(input, true);
  let result = 0;

  hands.sort((a, b) => sortByStrength(a, b, true));

  let rank = 1;
  for (const hand of hands) {
    result += hand.bid * rank;
    rank++;
  }
  return result;
};

if (require.main === module) {
  const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
