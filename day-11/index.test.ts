import {part2, part1} from './index';

const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

const answerPart1 = 374;
const answerPart2 = 82000210;

describe('Day 11', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(input);
    expect(result).toEqual(answerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(input);
    expect(result).toEqual(answerPart2);
  });
});
