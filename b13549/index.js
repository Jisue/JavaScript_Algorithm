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

/*
수빈이는 걷기, 순간이동 가능
X에서 1초후에 X-1, X+1 걷기
X에서 0초후에 2*X로 순간이동

0 5
1 4
2 3
3 2
4 1
5 0
6 1
7 2
8 3
9 4
10 0
11 1
12 2
13 2
14 1
15 0
16 1
17 2
18 2
19 1
20 0

*/