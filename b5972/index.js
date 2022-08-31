// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);

const graph = Array.from({length: N + 1}, () => []);
for(let i=1;i<=M;i++) {
    const [a, b, w] = input[i].split(" ").map(Number);
    graph[a].push([b, w]);
    graph[b].push([a, w]);
}

const bfs = () => {
    const queue = [];
    const dp = Array.from({length: N+1}, () => Infinity);
    dp[1] = 0;
    queue.push(1);
    while(queue.length !== 0) {
        const v = queue.shift();
        for(let i=0;i<graph[v].length;i++) {
            const [nv, nm] = graph[v][i];
            if(nm + dp[v] < dp[nv]) {
                dp[nv] = dp[v] + nm;
                queue.push(nv);
            }
        }
    }
    console.log(dp[N]);
}

bfs();
