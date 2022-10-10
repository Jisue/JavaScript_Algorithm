// 불장난
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N] = input[0].split(" ").map(Number);

// [층수][둘사이 거리]
const dp = Array.from({length: N+1}, () => Array(N+1).fill(0));
dp[2][1] = 2;

/* 
거리가 그대로 : 아래아래, 대각대각
거리가 줄어듬 : 대각아래
거리가 늘어남 : 아래대각
*/

for(let i=3;i<=N;i++) {
    for(let j=1;j<i;j++) {
        dp[i][j] = (dp[i-1][j]*2 + dp[i-1][j-1] + dp[i-1][j+1])%10007
    }
}

console.log(dp[N].reduce((acc, cur) => acc + cur)%10007);