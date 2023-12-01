import {part2, part1} from './index';

const input = `
Example input value 1
Example input value 2
Example input value 3
Example input value 4
Example input value 5
`;

const answerPart1 = 15;
const answerPart2 = 120;

describe('Day 1', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(input);
    expect(result).toEqual(answerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(input);
    expect(result).toEqual(answerPart2);
  });
});
