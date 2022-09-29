// 케빈 베이컨
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N, M] = input[0].split(" ").map(Number);

const graph = Array.from({length: N+1}, () => []);

const dist = Array.from({length: N+1}, () => Array(N+1).fill(Infinity));

for(let i=1;i<=M;i++) {
    const [a, b] = input[i].split(" ").map(Number);
    graph[a].push(b);
    graph[b].push(a);
    dist[a][b] = 1;
    dist[b][a] = 1;
}

const bfs = () => {
    for(let i=0;i<=N;i++) {
        dist[i][0] = 0;
    }
    for(let i=1;i<=N;i++) {
        for(let j=1;j<=N;j++) {
            for(let k=1;k<=N;k++) {
                if(j === k) {
                    dist[j][k] = 0;
                    continue;
                }
                dist[j][k] = Math.min(dist[j][k], dist[j][i] + dist[i][k]);
            }
        }
    }
}

bfs();

let min = Infinity;
let idx = 0;
for(let i=1;i<=N;i++) {
    const sum = dist[i].reduce((acc, cur) => acc + cur);
    if(sum < min) {
        min = sum;
        idx = i;
    }
}

console.log(idx);