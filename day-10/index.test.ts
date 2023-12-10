import {part2, part1} from './index';

const inputPart1 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

const inputPart2 = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

const answerPart1 = 8;
const answerPart2 = 10;

describe('Day 10', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(inputPart1);
    expect(result).toEqual(answerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(inputPart2);
    expect(result).toEqual(answerPart2);
  });
});
