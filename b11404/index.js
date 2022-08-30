// 플로이드
// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [N] = input[0].split(" ").map(Number);
const [M] = input[1].split(" ").map(Number);

const dp = Array.from({length: N + 1}, () => Array(N+1).fill(Infinity));
for(let i=2;i<M+2;i++) {
    const [a, b, c] = input[i].split(" ").map(Number);
    dp[a][b] = Math.min(c, dp[a][b]);
}

// 거처가는 노드
for(let i=1;i<=N;i++) {
    for(let j=1;j<=N;j++) {
        for(let k=1;k<=N;k++) {
            if(j === k) {
                dp[j][k] = 0;
                continue;
            }
            if(j === i || i === k) {
                continue;
            }
            dp[j][k] = Math.min(dp[j][k], dp[j][i] + dp[i][k]);
        }
    }
}

let str = "";
for(let i=1;i<=N;i++) {
    for(let j=1;j<=N;j++) {
        dp[i][j] === Infinity ? str += 0 : str += dp[i][j];
        j === N ? str += '\n' : str += " ";
    }
}
console.log(str.slice(0, str.length-1));