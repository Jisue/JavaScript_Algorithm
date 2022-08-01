const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n');

const N = parseInt(input[0]);
const K = parseInt(input[1]);

const dp = Array.from(Array(N+1), () => Array(K+1).fill(0));

for(let i=0;i<=N;i++) {
    dp[i][0] = 1;
    dp[i][1] = i;
}

for(let i=2;i<=N;i++) {
    for(let j=2;j<=K;j++) {
        // i번째 칸을 칠하는 경우 = dp[i-2][j-1]
        // i번째 칸을 칠하는 않는 경우 = dp[i-1][j]
        dp[i][j] = (dp[i-2][j-1] + dp[i-1][j]) % 1000000003;
    }
}

console.log((dp[N-1][K] + dp[N-3][K-1])% 1000000003);
