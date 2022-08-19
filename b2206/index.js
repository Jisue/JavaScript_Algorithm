// // const fs = require("fs");
// // let input = fs.readFileSync("/dev/stdin").toString().split('\n');

// 벽 부수고 이동하기

const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const board = [];

for(let i=1;i<=N;i++) {
    board.push(input[i].split("").map(Number).slice(0,M));
}

/*
{
    x : x좌표,
    y: y좌표,
    break : 벽을 부셨는지 boolean,
    move : 이동 횟수
}
*/

const bfs = () => {
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    const visit = Array.from(Array(N), () => Array(M));
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            visit[i][j] = new Array(2).fill(0);
        }
      }
    const queue = [];
    queue.push([0, 0, 0]);
    visit[0][0][0] = 1;
    let idx = 0;
    while(idx !== queue.length) {
        const [x, y, isBreak] = queue[idx];
        if(x === N-1 && y === M-1) {
            return visit[x][y][isBreak];
        }
        for(let i=0;i<4;i++) {
            const [nextX, nextY] = [x + dx[i], y + dy[i]];

            if(nextX < 0 || nextY < 0 || nextX >= N || nextY >= M) {
                continue;
            }

            if(board[nextX][nextY] === 0 && visit[nextX][nextY][isBreak] === 0) {
                visit[nextX][nextY][isBreak] = visit[x][y][isBreak] + 1;
                queue.push([nextX, nextY, isBreak]);
            } else if (board[nextX][nextY] === 1 && isBreak === 0) {
                visit[nextX][nextY][isBreak + 1] = visit[x][y][isBreak] + 1;
                queue.push([nextX, nextY, isBreak + 1]);
            }
        }
        idx++;
    }
    return -1;
}

console.log(bfs());