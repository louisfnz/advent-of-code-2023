import {readFileSync} from 'fs';

const VECTORS = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

const getEngineGrid = (input: string) => {
  return input.split('\n').map((line) => line.split(''));
};

export const part1 = (input: string) => {
  const grid = getEngineGrid(input);
  let result = 0;

  const checkPartNumber = (x: number, y: number, length: number) => {
    for (let i = 0; i < length; i++) {
      for (const v of VECTORS) {
        if (
          grid[y + v[1]] &&
          grid[y + v[1]][x + i + v[0]] &&
          /[^\d.]/.test(grid[y + v[1]][x + i + v[0]])
        ) {
          return true;
        }
      }
    }
    return false;
  };

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      let char = grid[y][x];
      const partNumber: string[] = [];
      while (/\d/.test(char)) {
        partNumber.push(char);
        x++;
        char = grid[y][x];
      }
      if (partNumber.length && checkPartNumber(x - partNumber.length, y, partNumber.length)) {
        result += Number(partNumber.join(''));
      }
    }
  }
  return result;
};

export const part2 = (input: string) => {
  const grid = getEngineGrid(input);
  const partNumbers = new Map<string, string>();
  const gears = [];
  let result = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      let char = grid[y][x];
      if (char === '*') {
        gears.push([x, y]);
        continue;
      }
      let partNumber = '';
      const coords = [];
      while (/\d/.test(char)) {
        partNumber += char;
        coords.push([x, y]);
        x++;
        char = grid[y][x];
      }
      if (partNumber.length) {
        for (const coord of coords) {
          partNumbers.set(coord.join(','), partNumber);
        }
        x--;
      }
    }
  }

  for (const [x, y] of gears) {
    const parts = new Set<string>();
    VECTORS.forEach((v) => {
      const ref = `${x + v[0]},${y + v[1]}`;
      const part = partNumbers.get(ref);
      if (part) {
        parts.add(part);
      }
    });

    if (parts.size === 2) {
      const partsArray = [...parts];
      result += Number(partsArray[0]) * Number(partsArray[1]);
    }
  }
  return result;
};

if (require.main === module) {
  const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
