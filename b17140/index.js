// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n');

const [r, c, k] = input[0].split(" ").map(Number);
const arr = [];
for(let i=1;i<=3;i++) {
    arr.push(input[i].split(" ").map(Number));
}

console.log(arr);
console.log(arr[r][c]);
/*
R연산 : 모든 행 정렬 수행 (행 개수 >= 열 개수 일때)
C연산 : 모든 열 정렬 수행 (행의 개수 < 열의 개수)
*/