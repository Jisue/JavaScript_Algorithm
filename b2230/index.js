// 백준 2230 수 고르기
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n');

const [N, M] = input[0].split(" ").map(Number);

const arr = [];

for(let i=1;i<=N;i++) {
    arr.push(parseInt(input[i]));
}

arr.sort((a, b) => a - b);

let min = Number.MAX_VALUE;

let start = 0;
let end = 1;
while(start < N && end < N) {
    const diff = arr[end] - arr[start];
    if(diff == M) {
        min = M;
        break;
    } else if(diff < M) {
        end++;
    } else {
        if(diff < min) {
            min = diff;
        }
        start++;
    }
}

console.log(min);