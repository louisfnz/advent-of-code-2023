import {readFileSync} from 'fs';

const getGames = (input: string) => {
  return input.split('\n').map((line) => {
    const temp = line.split(':');
    const id = Number(temp[0].replace('Game ', ''));
    return {
      id,
      rounds: temp[1].split(';').map((game) => {
        return game.split(',').map((cube) => {
          const temp = cube.trim().split(' ');
          return {
            color: temp[1],
            count: Number(temp[0]),
          };
        });
      }),
    };
  });
};

export const part1 = (input: string) => {
  const games = getGames(input);
  let result = 0;

  for (const game of games) {
    let valid = true;
    for (const round of game.rounds) {
      for (const cube of round) {
        if (cube.color === 'red' && cube.count > 12) {
          valid = false;
          break;
        }
        if (cube.color === 'green' && cube.count > 13) {
          valid = false;
          break;
        }
        if (cube.color === 'blue' && cube.count > 14) {
          valid = false;
          break;
        }
      }
    }
    if (valid) {
      result += game.id;
    }
  }

  return result;
};

export const part2 = (input: string) => {
  const games = getGames(input);
  let result = 0;

  for (const game of games) {
    const fewest = {
      red: -1,
      green: -1,
      blue: -1,
    };
    for (const round of game.rounds) {
      for (const cube of round) {
        for (const key of Object.keys(fewest) as Array<keyof typeof fewest>) {
          if (cube.color === key && cube.count > fewest[key]) {
            fewest[key] = cube.count;
          }
        }
      }
    }
    const power = fewest.red * fewest.green * fewest.blue;
    result += power;
  }

  return result;
};

if (require.main === module) {
  const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
