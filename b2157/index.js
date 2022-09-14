// 여행
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N, M, K] = input[0].split(" ").map(Number);

const graph = Array.from({length: N+1}, () => []);

for(let i=1;i<=K;i++) {
    const [a, b, c] = input[i].split(" ").map(Number);
    if(a > b) {
        continue;
    }
    graph[a].push([b, c]);
}

const dp = Array.from({length: M+1}, () => Array(N+1).fill(0));

const dfs = () => {
    const queue = [];
    queue.push(1);

    let cnt = 1;
    while(queue.length > 0 && cnt <= M) {
        const size = queue.length;
        let idx = 0;
        while(idx < size) {
            const node = queue.shift();
            for(let i=0;i<graph[node].length;i++) {
                const [next, food] = graph[node][i];
                const nextScore = dp[cnt][node] + food;
                if(dp[cnt+1][next] < nextScore) {
                    dp[cnt+1][next] = nextScore;
                    queue.push(next);
                }
            }
            idx++;
        }
        cnt++;
    }
}

dfs();

let answer = 0;
for(let i=2;i<=M;i++) {
    answer = Math.max(answer, dp[i][N]);
}
console.log(answer);