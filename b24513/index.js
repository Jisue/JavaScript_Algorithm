const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N, M] = input[0].split(" ").map(Number);

const village = [];
let virus = [];

for (let i = 1; i <= N; i++) {
    village.push(input[i].split(" ").map(Number));
    for (let j = 0; j < M; j++) {
        if (village[i - 1][j] === 1 || village[i - 1][j] === 2) {
            // x, y, type
            virus.push([i - 1, j, village[i - 1][j]]);
        }
    }
}

const checkOut = (x, y) => {
    if (x < 0 || y < 0 || x >= N || y >= M) {
        return true;
    }
    return false;
}

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

let idx = 0;
let one = 0;
let two = 0;
let three = 0;

let time = 2;

// 동시간대를 확인해야함!!
// 바이러스가 모두 퍼짐
while (idx < virus.length) {
    const [x, y, type] = virus[idx];
    idx++;
    if(village[x][y] === -1 || village[x][y] === Infinity) {
        continue;
    }
    for (let i = 0; i < 4; i++) {
        const [nx, ny] = [x + dx[i], y + dy[i]];
        if (checkOut(nx, ny) || village[nx][ny] === -1 || village[nx][ny] === Infinity) {
            continue;
        }
        if(village[nx][ny] === 0) {
            // 첫 방문
            village[nx][ny] = type + 2;
            virus.push([nx, ny, type + 2]);
        } else {
            // 동시간대 다른 바이러스 방문
            if(type%2 !== village[nx][ny]%2) {
                // 바이러스 1이 들어옴
                if(type%2 === 1 && village[nx][ny] - 1 === type + 2) {
                    village[nx][ny] = Infinity;
                } else if(type%2 === 0 && village[nx][ny] + 1 === type + 2) {
                    village[nx][ny] = Infinity;
                }
            }
        }
    }
}

for(let i=0;i<N;i++) {
    for(let j=0;j<M;j++) {
        if(village[i][j] === -1 || village[i][j] === 0) {
            continue;
        }
        if(village[i][j] %2 === 1) one++;
        else if(village[i][j] % 2 === 0) two++;
        else if(village[i][j] === Infinity) three++;
    }
}

console.log(one, two, three);