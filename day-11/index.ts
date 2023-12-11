import {readFileSync} from 'fs';

type Coord = {x: number; y: number};

const getUniverse = (input: string) => {
  return input.split('\n').map((line) => line.split(''));
};

const getGalaxies = (universe: string[][], expansion: number) => {
  const galaxies: Coord[] = [];
  for (let y = 0; y < universe.length; y++) {
    for (let x = 0; x < universe[y].length; x++) {
      if (universe[y][x] === '#') {
        galaxies.push({x, y});
      }
    }
  }

  const expandGalaxies = (dimension: 'x' | 'y', value: number) => {
    for (let g = 0; g < galaxies.length; g++) {
      if (galaxies[g][dimension] > value) {
        galaxies[g][dimension] += expansion - 1;
      }
    }
  };

  for (let y = universe.length - 1; y >= 0; y--) {
    if (!universe[y].join('').includes('#')) {
      expandGalaxies('y', y);
    }
  }

  for (let x = universe[0].length - 1; x >= 0; x--) {
    const column = universe.reduce((col, row) => col + row[x], '');
    if (!column.includes('#')) {
      expandGalaxies('x', x);
    }
  }

  return galaxies;
};

const manhattanDistance = (a: Coord, b: Coord) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

const sumGalaxyDistances = (galaxies: Coord[]) => {
  let result = 0;
  for (let g = 0; g < galaxies.length; g++) {
    for (let g2 = g + 1; g2 < galaxies.length; g2++) {
      const distance = manhattanDistance(galaxies[g], galaxies[g2]);
      result += distance;
    }
  }
  return result;
};

export function part1(input: string) {
  const universe = getUniverse(input);
  const galaxies = getGalaxies(universe, 2);
  return sumGalaxyDistances(galaxies);
}

export function part2(input: string) {
  const universe = getUniverse(input);
  const galaxies = getGalaxies(universe, 1000000);
  return sumGalaxyDistances(galaxies);
}

if (require.main === module) {
  const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
