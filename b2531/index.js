// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n');

const [N, d, k, c] = input[0].split(" ").map(Number);
const sushi = [];

for (let i = 0; i < N; i++) {
    sushi[i] = Number.parseInt(input[i + 1]);
}

// 마지막 인덱스를 넘어가는 애들 shift
const shiftArr = sushi.slice(0,k-1);
sushi.push(...shiftArr);

const map = new Map();
map.set(c, 1);
// 초기 시작 세팅
for (let i = 0; i < k; i++) {
    const num = sushi[i];
    if(map.get(num) !== undefined) {
        map.set(num, map.get(num) + 1);
    } else {
        map.set(num, 1);
    }
}

let max = map.size;

let idx = k;
while(idx < N+k-1) {
    const right = sushi[idx];
    const left = sushi[idx-k];

    // 오른쪽 추가
    if(map.get(right) !== undefined) {
        map.set(right, map.get(right) + 1);
    } else {
        map.set(right, 1);
    }

    // 왼쪽 제거
    if(map.get(left) === 1) {
        map.delete(left);
    } else {
        map.set(left, map.get(left) - 1);
    }

    // 최대값 갱신
    if(max < map.size) {
        max = map.size;
    }

    // 다음 기준 index값 갱신
    idx++;
}

console.log(max);