// 플로이드
// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [N, M, V] = input[0].split(" ").map(Number);
const graph = Array.from({length: N+1}, () => []);
for(let i=1;i<=M;i++) {
    const [s, e] = input[i].split(" ").map(Number);
    graph[s].push(e);
    graph[e].push(s);
}

for(let i=0;i<graph.length;i++) {
    graph[i].sort((a, b) => a - b);
}

const ret = [];
const dfs = (node, visit) => {
    ret.push(node);
    graph[node].forEach((i) => {
        if(!visit[i]) {
            visit[i] = true;
            dfs(i, visit);
        }
    })
}

const bfs = () => {
    const v = Array.from({length: N+1}, () => false);
    const queue = [];
    queue.push(V);
    v[V] = true;
    let idx = 0;
    while(idx < queue.length) {
        const node = queue[idx];
        graph[node].forEach((i) => {
            if(!v[i]) {
                v[i] = true;
                queue.push(i);
            }
        })
        idx++;
    }
    console.log(queue.join(" "));
}

const visit = Array.from({length: N+1}, () => false);
visit[V] = true;
dfs(V, visit);
console.log(ret.join(" "));
bfs();