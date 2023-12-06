import {readFileSync} from 'fs';

const getMaps = (input: string) => {
  const maps: Record<string, number[][]> = {};
  const temp = input.split('\n\n');
  const seeds = temp[0].split(':')[1].trim().split(' ').map(Number);
  for (let i = 1; i < temp.length; i++) {
    const map = temp[i].split('\n');
    const name = map[0].replace(' map:', '').trim();

    for (let n = 1; n < map.length; n++) {
      const line = map[n].trim().split(' ');
      const destination = Number(line[0]);
      const source = Number(line[1]);
      const range = Number(line[2]);

      if (!maps[name]) {
        maps[name] = [];
      }
      maps[name].push([destination, source, range]);
    }
  }
  return {seeds, maps};
};

const findMapped = (value: number, map: number[][]) => {
  for (const range of map) {
    if (value >= range[1] && value <= range[1] + range[2]) {
      return range[0] + (value - range[1]);
    }
  }
  return value;
};

const runSeed = (seed: number, maps: Record<string, number[][]>) => {
  const soil = findMapped(seed, maps['seed-to-soil']);
  const fertilizer = findMapped(soil, maps['soil-to-fertilizer']);
  const water = findMapped(fertilizer, maps['fertilizer-to-water']);
  const light = findMapped(water, maps['water-to-light']);
  const temperature = findMapped(light, maps['light-to-temperature']);
  const humidity = findMapped(temperature, maps['temperature-to-humidity']);
  return findMapped(humidity, maps['humidity-to-location']);
};

export const part1 = (input: string) => {
  const {seeds, maps} = getMaps(input);
  let result = Number.POSITIVE_INFINITY;
  for (const seed of seeds) {
    const location = runSeed(seed, maps);
    result = Math.min(result, location);
  }
  return result;
};

export const part2 = (input: string) => {
  const {seeds, maps} = getMaps(input);
  let result = Number.POSITIVE_INFINITY;
  for (let i = 0; i < seeds.length; i += 2) {
    for (let seed = seeds[i]; seed < seeds[i] + seeds[i + 1]; seed++) {
      const location = runSeed(seed, maps);
      result = Math.min(result, location);
    }
  }
  return result;
};

if (require.main === module) {
  const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
