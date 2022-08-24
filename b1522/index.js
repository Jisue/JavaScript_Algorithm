// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const word = input[0].split("").map(String);

const len = word.filter((i) => i === 'a').length;

// len 씩 슬라이딩 윈도우를 해서 a가 가장 많은 구간 찾기

// 초기값 세팅
let sum = 0;
for(let i=0;i<len;i++) {
    sum += word[i] === 'a' ? 1 : 0;
}

// 가장 큰 값 찾기 위해 세팅
let max = sum;

for(let i=len;i<word.length + len - 1;i++) {
    let w;

    // 새로운 값 더하기
    if(i >= word.length) {
        w = word[i-word.length];
    } else {
        w = word[i];
    }
    sum += w === 'a' ? 1 : 0;

    // 이전값 빼기
    sum -= word[i-len] === 'a' ? 1 : 0;

    if(sum > max) {
        max = sum;
    }
}

// (전체 a의 수 - 최대 연속수 = 최소 이동 횟수)

console.log(len - max);