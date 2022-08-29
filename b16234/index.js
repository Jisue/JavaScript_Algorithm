// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [N, L, R] = input[0].split(" ").map(Number);
const A = [];
for(let i=1;i<=N;i++) {
    A.push(input[i].split(" ").map(Number));
}

const bfs = (sx, sy, visit) => {
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    const queue = [];
    queue.push([sx,sy]);
    visit[sx][sy] = true;
    let index = 0;
    let total = 0;
    while(index !== queue.length) {
        const [x, y] = queue[index];
        total += A[x][y];
        for(let i=0;i<4;i++) {
            const [nx, ny] = [x + dx[i], y + dy[i]];
            if(nx < 0 || ny < 0 || nx >= N || ny >= N || visit[nx][ny]) {
                continue;
            }
            const diff = Math.abs(A[x][y] - A[nx][ny]);
            // 인구 이동이 가능한 차이
            if(diff >= L && diff <= R) {
                queue.push([nx, ny]);
                visit[nx][ny] = true;
            }
        }
        index++;
    }
    if(queue.length === 1) {
        return false;
    }
    const polulation = Math.floor(total/queue.length);
    queue.forEach((q) => {
        const [x, y] = q;
        A[x][y] = polulation;
    });
    return true;
}

let move = true;
let cnt = 0;

while(move) {
    const visit = Array.from({length: N}, () => Array(N).fill(false));
    move = false;
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            if(visit[i][j]) {
                continue;
            }
            if(bfs(i, j, visit)) {
                move = true;
            }
        }
    }
    if(move) {
        cnt++;
    }
}

console.log(cnt);