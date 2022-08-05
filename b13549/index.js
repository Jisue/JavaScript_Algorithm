const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n');

const [N, K] = input[0].split(" ").map(Number);
const len = K + N;

let dp = Array.from({length: len}, (_, i) => -1);

for(let i=0;i<=N;i++) {
    dp[i] = N-i;
}

for(let i=N+1;i<=len;i++) {
    const num = dp[i-1] + 1;
    const divNum = i/2;
    if(divNum >= 0 && dp[divNum] < num) {
        dp[i] = dp[divNum];

        // 밑에 애들도 갱신
        for(let j=i-1;j>=divNum;j--) {
            if(dp[j+1] + 1 < dp[j]) {
                dp[j] = dp[j+1] + 1;
            } else {
                break;
            }
        }
    } else {
        dp[i] = num;
    }
}

console.log(dp[K]);