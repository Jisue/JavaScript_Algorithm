// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const graph = Array.from({length: N+1}, () => []);
const dist = Array.from({length: N + 1}, () => 0);
for(let i=1;i<=M;i++) {
    const [a, b] = input[i].split(" ").map(Number);
    graph[a].push(b);
    dist[b]++;
}

const queue = [];
for(let i=1;i<=N;i++) {
    if(dist[i] === 0) {
        queue.push(i);
    }
}

let idx = 0;
while(idx < queue.length) {
    const node = queue[idx];
    graph[node].forEach((i) => {
        dist[i]--;
        if(dist[i] === 0) {
            queue.push(i);
        }
    })
    idx++;
}

console.log(queue.join(" "));