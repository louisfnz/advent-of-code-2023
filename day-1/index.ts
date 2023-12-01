import {readFileSync} from 'fs';

const WORDS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const getInputLines = (input: string) => input.trim().split('\n');

export const part1 = (input: string) => {
  return getInputLines(input).reduce((result, line) => {
    const num1 = line.split('').filter((char) => /\d/.test(char))[0];
    const num2 = line
      .split('')
      .reverse()
      .filter((char) => /\d/.test(char))[0];
    return result + parseInt(`${num1}${num2}`);
  }, 0);
};

export const part2 = (input: string) => {
  return getInputLines(input).reduce((result, line) => {
    const matches = Array.from(
      line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine|zero))/g),
    ).map((m) => m[1]);

    const num1 = WORDS[matches[0]] ?? matches[0];
    const num2 = WORDS[matches[matches.length - 1]] ?? matches[matches.length - 1];

    return result + parseInt(`${num1}${num2}`);
  }, 0);
};

if (require.main === module) {
  const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
