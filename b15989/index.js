// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [T] = input[0].split(" ").map(Number);

const div = (n) => {
    let cnt = 0;
    // 1로 모두 분해
    cnt += 1;
    // 2로 모두 분해
    cnt += Math.floor(n/2);
    // 3로 모두 분해
    cnt += Math.floor(n/3);

    for(let i=n-2;i>=3;i-=2) {
        cnt += Math.floor(i/3);
    }
    console.log(cnt);
}

for(let i=1;i<=T;i++) {
    div(Number.parseInt(input[i]));
}