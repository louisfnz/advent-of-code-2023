import {part2, part1} from './index';

const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const answerPart1 = 6440;
const answerPart2 = 5905;

describe('Day 7', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(input);
    expect(result).toEqual(answerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(input);
    expect(result).toEqual(answerPart2);
  });
});
