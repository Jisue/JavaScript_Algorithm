const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');
const [N] = input[0].split(" ").map(Number);

let max = 0;
let min = Infinity;

const dp = Array.from({length: 101}, () => Infinity);
const match_min = [0, 0, 1, 7, 4, 2, 0, 8, 10];

//dp 배열을 미리 작성한다.     
for (let i = 1; i < 9; i++) {          
    dp[i] = match_min[i];
}
dp[6] = 6;

for (let i = 9; i <= 100; i++) {
	//성냥 2개를 빼서 1을 만들고, 남은 성냥으로 만들 수 있는 가장 큰 수가 10의 자리가 됨.
	dp[i] = dp[i-2]*10 + match_min[2];
    
    for (let j = 3; j < 8; j++) {
    	dp[i] = Math.min(dp[i], dp[i-j]*10 + match_min[j]);
    }
}

let answer = '';
for(let i=1;i<=N;i++) {
    const size = Number.parseInt(input[i]);
    if(size %2 === 1) {
        // 홀수일 때
        max = '7' + '1'.repeat((size-3)/2);
    } else {
        max = '1'.repeat(size/2);
    }
    answer += dp[size] + " " + max + '\n';
    max = 0;
    min = Infinity;
}

console.log(answer);