import {readFileSync} from 'fs';

function getInstructions(input: string) {
  const lines = input.split('\n');
  const nodes = lines.slice(2).reduce<Record<string, [string, string]>>((acc, line) => {
    acc[line.slice(0, 3)] = [line.slice(7, 10), line.slice(12, 15)];
    return acc;
  }, {});

  return {
    directions: lines[0].split('') as ('L' | 'R')[],
    nodes,
  };
}

const greatestCommonDivisor = (a: number, b: number) => {
  while (b > 0) {
    const mod = a % b;
    a = b;
    b = mod;
  }
  return a;
};
const lowestCommonMultiple = (a: number, b: number) => {
  return (a * b) / greatestCommonDivisor(a, b);
};

export function part1(input: string) {
  const {directions, nodes} = getInstructions(input);
  let steps = 0;
  let curr = 'AAA';
  let i = 0;

  while (curr !== 'ZZZ') {
    steps++;
    curr = nodes[curr][directions[i] === 'L' ? 0 : 1];
    i = (i + 1) % directions.length;
  }

  return steps;
}

export function part2(input: string) {
  const {directions, nodes} = getInstructions(input);
  const lengths = Object.keys(nodes)
    .filter((id) => id.endsWith('A'))
    .map((curr) => {
      let steps = 0;
      let i = 0;

      while (!curr.endsWith('Z')) {
        steps++;
        curr = nodes[curr][directions[i] === 'L' ? 0 : 1];
        i = (i + 1) % directions.length;
      }

      return steps;
    });

  return lengths.reduce((n, x) => lowestCommonMultiple(x, n), 1);
}

if (require.main === module) {
  const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
