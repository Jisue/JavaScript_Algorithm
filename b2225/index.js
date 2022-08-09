// 0부터 N까지의 정수 K개를 더해서 합이 N이 되는 경우의 수
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n');

const [N, K] = input[0].split(" ").map(Number);

let dp = Array.from({length: K + 1}, () => []);
dp[1] = Array.from({length: N + 1}, () => 1);

for(let i=2;i<=K;i++) {
    for(let j=0;j<=N;j++) {
        if(j == 0) {
            dp[i][j] = 1;
            continue;
        }
        dp[i][j] = (dp[i-1][j] + dp[i][j-1])%1000000000;
    }
}

console.log(dp[K][N]);