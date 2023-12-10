import {part2, part1} from './index';

const inputPart1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const inputPart2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const answerPart1 = 2;
const answerPart2 = 6;

describe('Day 8', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(inputPart1);
    expect(result).toEqual(answerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(inputPart2);
    expect(result).toEqual(answerPart2);
  });
});
