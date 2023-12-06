import {readFileSync} from 'fs';

const getRaces = (input: string) => {
  const temp = input.split('\n');
  const times = temp[0].split(':')[1].replace(/\s+/g, ' ').split(' ');
  const distances = temp[1].split(':')[1].replace(/\s+/g, ' ').split(' ');
  return times.map((time, i) => ({time, distance: distances[i]}));
};

const runRace = (time: number, distance: number) => {
  let records = 0;
  for (let i = 1; i < time; i++) {
    const raceDistance = i * (time - i);
    if (raceDistance > distance) {
      records++;
    }
  }
  return records;
};

export const part1 = (input: string) => {
  const races = getRaces(input);
  let result = 1;

  for (const race of races) {
    const {time, distance} = race;
    const records = runRace(Number(time), Number(distance));
    if (records) {
      result *= records;
    }
  }
  return result;
};

export const part2 = (input: string) => {
  const races = getRaces(input);
  const time = Number(races.map(({time}) => time).join(''));
  const distance = Number(races.map(({distance}) => distance).join(''));
  return runRace(time, distance);
};

if (require.main === module) {
  const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
