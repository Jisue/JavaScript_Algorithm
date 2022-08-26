// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [N] = input[0].split(" ").map(Number);

// 출석-지각-결석
function countAttend(o, l, a) {
    // 지각을 두번 이상 한 경우 or 결석을 연속 세번 한 경우
    if (l === 2 || a === 3) {
      return 0;
    }
    // 개근한 경우
    if (o === N) {
      return 1;
    }
  
    if (dp[o][l][a] !== 0) {
      return dp[o][l][a];
    }
  
    // 다음이 그냥 출석인 경우
    dp[o][l][a] += countAttend(o + 1, l, 0);
    // 다음이 지각인 경우
    dp[o][l][a] += countAttend(o + 1, l + 1, 0);
    // 다음이 결석인 경우
    dp[o][l][a] += countAttend(o + 1, l, a + 1);
  
    return dp[o][l][a] % 1000000;
  }
  
  const dp = Array.from(Array(N), () =>
    Array.from(Array(2), () => Array(3).fill(0))
  ); // 1000(출석) * 2(지각) * 3(결석연속)
  
  console.log(countAttend(0, 0, 0)); // 출석-지각-결석
/*
지각을 두 번 이상 했거나, 결석을 세 번 연속으로 한 사람
O : 출석
L : 지각
A : 결석
*/