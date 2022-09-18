// 아맞다우산
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N, M] = input[0].split(" ").map(Number);

const board = [];

for (let i = 1; i <= M; i++) {
    board.push(input[i].split(""));
}

let start;
let stuff = 0;
for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
        if (board[i][j] === 'S') {
            start = [i, j];
        } else if (board[i][j] === 'X') {
            board[i][j] = stuff;
            stuff++;
        }
    }
}

const dx = [1, -1, 0, 0];
const dy = [0, 0, -1, 1];

const checkOut = (x, y) => {
    return x < 0 || y < 0 || x >= M || y >= N;
}

let min = Infinity;

const bfs = () => {
    const queue = [];
    const visit = Array.from({ length: M }, () => Array.from({ length: N }, () => Array(stuff).fill(false)));
    // [x, y, move, cnt];
    queue.push([start[0], start[1], 0, 0]);
    let idx = 0;
    while (idx < queue.length) {
        const [x, y, move, cnt] = queue[idx];
        idx++;
        if (board[x][y] === 'E' && cnt === ((1 << stuff) - 1)) {
            min = Math.min(min, move);
            return;
        }
        for (let i = 0; i < 4; i++) {
            const [nx, ny] = [x + dx[i], y + dy[i]];
            let nextCnt = 0;
            if (checkOut(nx, ny) || visit[nx][ny][cnt] || board[nx][ny] === '#') {
                continue;
            }

            const num = board[nx][ny];
            if (num >= 0 && num <= 5) {
                nextCnt = (cnt | (1 << num));
                visit[nx][ny][nextCnt] = true;
                queue.push([nx, ny, move + 1, nextCnt]);
                continue;
            }
            visit[nx][ny][cnt] = true;
            queue.push([nx, ny, move + 1, cnt]);
        }
    }
}

bfs();

console.log(min);