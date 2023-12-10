import {readFileSync} from 'fs';

const getMaze = (input: string) => {
  return input.split('\n').map((line) => line.split(''));
};

const getPipe = (maze: string[][], x: number, y: number) => {
  if (x < 0 || y < 0 || y >= maze.length || x >= maze[y].length) return null;
  return maze[y][x];
};

const getNext = (pipe: string, dir: string, x: number, y: number) => {
  let next = [x, y];
  if (dir === 'U') {
    switch (pipe) {
      case '|': {
        next = [x, y - 1];
        dir = 'U';
        break;
      }
      case '7': {
        next = [x - 1, y];
        dir = 'L';
        break;
      }
      case 'F': {
        next = [x + 1, y];
        dir = 'R';
        break;
      }
    }
  } else if (dir === 'R') {
    switch (pipe) {
      case '-': {
        next = [x + 1, y];
        dir = 'R';
        break;
      }
      case '7': {
        next = [x, y + 1];
        dir = 'D';
        break;
      }
      case 'J': {
        next = [x, y - 1];
        dir = 'U';
        break;
      }
    }
  } else if (dir === 'D') {
    switch (pipe) {
      case '|': {
        next = [x, y + 1];
        dir = 'D';
        break;
      }
      case 'J': {
        next = [x - 1, y];
        dir = 'L';
        break;
      }
      case 'L': {
        next = [x + 1, y];
        dir = 'R';
        break;
      }
    }
  } else if (dir === 'L') {
    switch (pipe) {
      case '-': {
        next = [x - 1, y];
        dir = 'L';
        break;
      }
      case 'F': {
        next = [x, y + 1];
        dir = 'D';
        break;
      }
      case 'L': {
        next = [x, y - 1];
        dir = 'U';
        break;
      }
    }
  }
  return {next, dir};
};

const getPath = (maze: string[][], start: [number, number], dir: string) => {
  let next = [start[0] + 1, start[1]];

  switch (dir) {
    case 'U': {
      next = [start[0], start[1] - 1];
      break;
    }
    case 'D': {
      next = [start[0], start[1] + 1];
      break;
    }
    case 'L': {
      next = [start[0] - 1, start[1]];
      break;
    }
  }

  const path = new Set([`${start[0]},${start[1]}`, `${next[0]},${next[1]}`]);
  while (true) {
    const pipe = getPipe(maze, next[0], next[1]);
    if (pipe === 'S') break;

    const nextInstruction = getNext(pipe!, dir, next[0], next[1]);
    next = nextInstruction.next;
    dir = nextInstruction.dir;

    path.add(`${next[0]},${next[1]}`);
  }
  return path;
};

const getStartDetails = (maze: string[][]) => {
  let start: [number, number] = [0, 0];

  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === 'S') {
        start = [x, y];
      }
    }
  }

  const top = getPipe(maze, start[0], start[1] - 1);
  const right = getPipe(maze, start[0] + 1, start[1]);
  const bottom = getPipe(maze, start[0], start[1] + 1);
  const left = getPipe(maze, start[0] - 1, start[1]);

  let pipe = '';
  let dir = 'L';

  const validTop = '|7F';
  const validRight = '7J-';
  const validBottom = '|LJ';
  const validLeft = '-LF';

  if (top && validTop.includes(top)) {
    dir = 'U';
    if (right && validRight.includes(right)) pipe = 'L';
    if (bottom && validBottom.includes(bottom)) pipe = '|';
    if (left && validLeft.includes(left)) pipe = '|';
  } else if (right && validRight.includes(right)) {
    dir = 'R';
    if (top && validTop.includes(top)) pipe = 'L';
    if (bottom && validBottom.includes(bottom)) pipe = 'F';
    if (left && validLeft.includes(left)) pipe = 'J';
  } else if (bottom && validBottom.includes(bottom)) {
    dir = 'D';
    if (top && validTop.includes(top)) pipe = '|';
    if (right && validRight.includes(right)) pipe = 'F';
    if (left && validLeft.includes(left)) pipe = '7';
  }

  return {start, pipe, dir};
};

export function part1(input: string) {
  const maze = getMaze(input);
  const {start, dir} = getStartDetails(maze);
  const path = getPath(maze, start, dir);
  return Math.ceil(path.size / 2);
}

export function part2(input: string) {
  const maze = getMaze(input);
  const {start, dir, pipe} = getStartDetails(maze);
  const path = getPath(maze, start, dir);

  maze[start[1]][start[0]] = pipe;

  return maze.reduce(
    (acc, row, y) => {
      row.forEach((pipe, x) => {
        const inPath = path.has(`${x},${y}`);
        if (inPath) {
          if (pipe === '|') {
            acc.crossings++;
          } else if ('L7JF'.includes(pipe)) {
            if (acc.prevCorner) {
              if (
                (acc.prevCorner === 'L' && pipe === '7') ||
                (acc.prevCorner === 'F' && pipe === 'J')
              ) {
                acc.crossings++;
              }
              acc.prevCorner = '';
            } else {
              acc.prevCorner = pipe;
            }
          }
        } else if (acc.crossings % 2 === 1) {
          acc.total++;
        }
      });
      return acc;
    },
    {total: 0, crossings: 0, prevCorner: ''},
  ).total;
}

if (require.main === module) {
  const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
