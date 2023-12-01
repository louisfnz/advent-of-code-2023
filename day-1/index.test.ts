import { part2, part1 } from "./index";

const inputPart1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const inputPart2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const answerPart1 = 142;
const answerPart2 = 281;

describe("Day 1", () => {
  it("Calculates part 1 correctly", () => {
    const result = part1(inputPart1);
    expect(result).toEqual(answerPart1);
  });

  it("Calculates part 2 correctly", () => {
    const result = part2(inputPart2);
    expect(result).toEqual(answerPart2);
  });
});
