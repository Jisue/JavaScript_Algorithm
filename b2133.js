// 백준 2133 타일 채우기

/*
2
*/

const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString();
const N = parseInt(input);

let dp = Array.from({length: N}, () => 0);

const find = () => {
    dp[0] = 1;
    dp[2] = 3;
    if(N%2 == 0) {
        for(let i = 4; i <= N; i += 2) {
            dp[i] = dp[i-2] * 3;
            for(let j = i - 4; j >= 0; j -= 2) {
                dp[i] += dp[j] * 2;
            }
        }
    }
    console.log(dp[N]);
}

find();
