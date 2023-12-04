import {readFileSync} from 'fs';

const getCards = (input: string) => {
  return input.split('\n').map((line) => {
    const parts = line.split('|');
    const part1 = parts[0].split(':');
    const cardNumber = part1[0].replace(/\D/g, '');
    const winningNumbers = part1[1].split(/\s+/).map(Number).filter(Boolean);
    const yourNumbers = parts[1].split(/\s+/).map(Number).filter(Boolean);
    const combined = new Set([...winningNumbers, ...yourNumbers]);
    const totalWinning = winningNumbers.length - (combined.size - yourNumbers.length);
    return {
      cardNumber,
      totalWinning,
    };
  });
};

export const part1 = (input: string) => {
  return getCards(input).reduce((total, card) => {
    let cardResult = card.totalWinning ? 1 : 0;
    for (let i = 1; i < card.totalWinning; i++) {
      cardResult *= 2;
    }
    return total + cardResult;
  }, 0);
};

export const part2 = (input: string) => {
  const cards = getCards(input);
  const totalCards = cards.reduce<Record<string, number>>((acc, card) => {
    acc[card.cardNumber] = 1;
    return acc;
  }, {});
  for (const card of cards) {
    const multiplier = totalCards[card.cardNumber];
    for (let i = 1; i <= card.totalWinning; i++) {
      totalCards[Number(card.cardNumber) + i] += multiplier;
    }
  }
  return Object.values(totalCards).reduce((total, cardTotal) => total + cardTotal, 0);
};

if (require.main === module) {
  const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
