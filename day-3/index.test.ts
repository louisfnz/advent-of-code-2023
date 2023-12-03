import {part2, part1} from './index';

const inputPart1 = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const inputPart2 = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const answerPart1 = 4361;
const answerPart2 = 467835;

describe('Day 3', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(inputPart1);
    expect(result).toEqual(answerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(inputPart2);
    expect(result).toEqual(answerPart2);
  });
});
