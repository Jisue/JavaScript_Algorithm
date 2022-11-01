const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');
const [N, M] = input[0].split(" ").map(Number);

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const maze = [];
let move = [];
let fire = [];
for(let i=1;i<=N;i++) {
    maze.push(input[i].split("").slice(0, M));
    for(let j=0;j<M;j++) {
        if(maze[i-1][j] === 'J') {
            move.push([i-1, j, 1]);
        } else if(maze[i-1][j] === 'F') {
            fire.push([i-1, j, 1]);
        }
    }
}

const out = (x, y) => {
    return x < 0 || y < 0 || x >= N || y >= M;
}

const dp = Array.from({length: N}, () => Array(M).fill(0));
const fireMove = (fire, move, time) => {
    const nextFire = [];
    const nextMove = [];
    while(fire.length > 0) {
        const [fx, fy] = fire.shift();
        for(let i=0;i<4;i++) {
            const [nx, ny] = [fx + dx[i], fy + dy[i]];
            if(out(nx, ny)) {
                continue;
            }
            if(maze[nx][ny] === '.' || maze[nx][ny] === 'J') {
                maze[nx][ny] = 'F';
                nextFire.push([nx, ny]);
            }
        }
    }
    while(move.length > 0) {
        const [x, y, t] = move.shift();
        for(let i=0;i<4;i++) {
            const [nx, ny] = [x + dx[i], y + dy[i]];
            if(out(nx, ny)) {
                console.log(time);
                return;
            }
            if(maze[nx][ny] !== '.') {
                continue;
            }
            nextMove.push([nx, ny, t+1]);
        }
    }
    if(nextMove.length > 0) {
        fireMove(nextFire, nextMove, time + 1);
    } else {
        console.log("IMPOSSIBLE");
    }
}
fireMove(fire, move, 1);