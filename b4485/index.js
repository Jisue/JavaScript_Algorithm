const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n');

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const dijkstra = (cave, N, dijk) => {
    dijk[0][0] = cave[0][0];
    const pq = [];
    pq.push({x: 0, y: 0, cnt: cave[0][0]});

    while(pq.length > 0) {
        const p = pq.shift();

        for(let i=0;i<4;i++) {
            const nextX = p.x + dx[i];
            const nextY = p.y + dy[i];

            if(nextX < 0 || nextX >= N || nextY < 0 || nextY >= N) {
                continue;
            }
            if(dijk[nextX][nextY] > dijk[p.x][p.y] + cave[nextX][nextY]) {
                dijk[nextX][nextY] = dijk[p.x][p.y] + cave[nextX][nextY];
                pq.push({x: nextX, y: nextY, cnt: dijk[nextX][nextY] });
            }
        }
    }
}

let T = 0;
let num = 1;
while (true) {
    const N = Number.parseInt(input[T]);
    if (N === 0) {
        break;
    }
    T++;
    const cave = [];
    for (let i = T; i < T + N; i++) {
        cave.push(input[i].split(" ").map(Number))
    }
    T += N;

    const dijk = Array.from(Array(N), () => Array(N).fill(Number.MAX_VALUE));
    dijkstra(cave, N, dijk);
    console.log(`Problem ${num}: ${dijk[N-1][N-1]}`);
    num++;
}