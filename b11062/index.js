// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const solution = (N, cards) => {
    const dp = Array.from({length: N}, () => Array(N).fill(0));
    const game = (left, right, turn) => {
        if(left > right) return 0;
        if(dp[left][right] > 0) return dp[left][right];
    
        if(turn % 2) { // 근우 차례
            return dp[left][right] = Math.max(cards[left] + game(left + 1, right, turn + 1), cards[right] + game(left, right - 1, turn + 1))
        } else {
            return dp[left][right] = Math.min(game(left + 1, right, turn + 1), game(left, right - 1, turn + 1))
        }
    }
    game(0,N-1,1);

    console.log(dp[0][N-1]);
}

// 테스트 케이스
const T = Number.parseInt(input[0]);

for(let i=1;i<=T*2;i+=2) {
    const N = Number.parseInt(input[i]);
    const cards = input[i+1].split(" ").map(Number);
    solution(N, cards);
}