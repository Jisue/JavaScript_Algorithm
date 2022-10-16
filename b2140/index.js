const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');
const [N] = input[0].split(" ").map(Number);

const board = Array.from({ length: N }, () => Array(N).fill());
for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        const temp = input[i + 1].split("");
        if (temp[j] !== '#') {
            board[i][j] = Number.parseInt(temp[j]);
        } else {
            board[i][j] = temp[j];
        }
    }
}

const checkIn = (x, y) => {
    return ((x === 0 || x === N - 1) && y >= 0 && y < N) || ((y === 0 || y === N - 1) && x >= 0 && x < N)
}

const checkBomb = (x, y) => {
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (checkIn(i, j)) {
                if (board[i][j] - 1 === -1) {
                    return false;
                }
            }
        }
    }
    return true;
}

const dfs = (x, y, cnt) => {
    if (x === N - 1) {
        console.log(cnt);
        return;
    }
    if (y >= N - 1) {
        dfs(x + 1, 1, cnt);
        return;
    }

    if (x > 1 && x < N - 2 && y > 1 && y < N - 2) {
        // board[x][y] = '*';
        dfs(x, y + 1, cnt + 1);
        return;
    }

    // 폭탄 설치 O
    const addBomb = checkBomb(x, y);
    if (!addBomb) {
        dfs(x, y + 1, cnt);
    } else {
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (checkIn(i, j)) {
                    board[i][j]--;
                }
            }
        }
        // board[x][y] = '*';
        dfs(x, y + 1, cnt + 1);
    }
}

if (N >= 3) {
    dfs(1, 1, 0);
} else {
    console.log(0);
}