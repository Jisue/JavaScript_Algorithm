// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n');

const N = Number.parseInt(input[0]);
const K = Number.parseInt(input[1]);
const sensor = input[2].split(" ").map(Number);
sensor.sort((a, b) => a-b)

const diff = [];
for(let i=0;i<N-1;i++) {
    diff[i] = sensor[i+1] - sensor[i];
}
diff.sort((a, b) => a-b)
let acc = 0;
for(let i=0;i<N-K;i++) {
    acc += diff[i];
}
console.log(acc);
/*
0 1 0 3 0 0 6 7 0 9 

센서 6개
최대 2개 집중국의 수진 가능 영역의 합의 최솟값을 출력해야함
1, 3, 6, 6, 7, 9
-> 2, 3, 0, 1, 2

1회 뛰어 넘을 수 있음
그럼

*/