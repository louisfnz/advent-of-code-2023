import {part2, part1} from './index';

const input = `Time:      7  15   30
Distance:  9  40  200`;

const answerPart1 = 288;
const answerPart2 = 71503;

describe('Day 6', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(input);
    expect(result).toEqual(answerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(input);
    expect(result).toEqual(answerPart2);
  });
});
