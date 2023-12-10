import {part2, part1} from './index';

const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const answerPart1 = 114;
const answerPart2 = 2;

describe('Day 9', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(input);
    expect(result).toEqual(answerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(input);
    expect(result).toEqual(answerPart2);
  });
});
