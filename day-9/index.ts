import {readFileSync} from 'fs';

const getSequences = (input: string) => {
  return input.split('\n').map((line) => line.split(' ').map(Number));
};

const createDiffs = (seq: number[]) => {
  const diffs: number[][] = [seq];
  while (!/^0+$/.test(seq.join(''))) {
    const diff = seq.reduce<number[]>((acc, cur, i, orig) => {
      if (i > 0) {
        acc.push(cur - orig[i - 1]);
      }
      return acc;
    }, []);
    diffs.push(diff);
    seq = diff;
  }
  diffs[diffs.length - 1].push(0);
  return diffs;
};

const runForwards = (seq: number[]) => {
  const diffs = createDiffs(seq);

  for (let i = diffs.length - 2; i >= 0; i--) {
    const index = diffs[i].length - 1;
    diffs[i].push(diffs[i][index] + diffs[i + 1][index]);
  }
  return diffs[0][diffs[0].length - 1];
};

const runBackwards = (seq: number[]) => {
  const diffs = createDiffs(seq);
  for (let i = diffs.length - 2; i >= 0; i--) {
    diffs[i].unshift(diffs[i][0] - diffs[i + 1][0]);
  }
  return diffs[0][0];
};

export function part1(input: string) {
  return getSequences(input).reduce((total, seq) => total + runForwards(seq), 0);
}

export function part2(input: string) {
  return getSequences(input).reduce((total, seq) => total + runBackwards(seq), 0);
}

if (require.main === module) {
  const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
