// 백준 1520 내리막 길
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n');

/*
if (N === 0) {
      N = parseInt(line);
      return;
    }
    input.push(line.split(" ").map((v) => parseInt(v)));
*/

// 항상 높이가 더 낮은 지점으로만 이동 가능

const [M, N] = input[0].split(" ").map(Number);
const board = [];

for(let i=1;i<=M;i++) {
    board.push(input[i].split(" ").map(Number));
}

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const dp = Array.from(Array(M), () => Array(N).fill(-1));

const dfs = (x, y) => {
    // 도착
    if(x === M-1 && y === N-1) {
        return 1;
    }

    // 이미 방문한 길
    if(dp[x][y] !== -1) {
        return dp[x][y];
    }

    dp[x][y] = 0; // 현재 위치에서 끝점까지 도달하는 경로의 개수를 0으로 초기화

    for(let i=0;i<4;i++) {
        const nextX = x + dx[i];
        const nextY = y + dy[i];

        if(nextX < 0 || nextY < 0 || nextX >= M || nextY >= N) {
            continue;
        }

        if(board[nextX][nextY] < board[x][y]) {
            dp[x][y] += dfs(nextX, nextY);
        }
    }
    return dp[x][y];
}

console.log(dfs(0,0));