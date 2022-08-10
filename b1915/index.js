// 0부터 N까지의 정수 K개를 더해서 합이 N이 되는 경우의 수
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n');

const [N, M] = input[0].split(" ").map(Number);
const board = [];
for(let i=1;i<=N;i++) {
    board.push(input[i].split("").map(Number).splice(0,M));
}

const dp = Array.from({length: N}, () => Array.from({length: M}, () => 0));
let max = 0;
for(let i=0;i<N;i++) {
    for(let j=0;j<M;j++) {
        if(i === 0 || j === 0) {
            dp[i][j] = board[i][j];
        } else if(board[i][j] === 0) {
            dp[i][j] = 0;
        } else {
            dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1;
        }
        if(dp[i][j] > max) {
            max = dp[i][j];
        }
    }
}

console.log(max*max);