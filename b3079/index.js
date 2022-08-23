// // const fs = require("fs");
// // let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const time = [];

for(let i=1;i<=N;i++) {
    time[i-1] = Number.parseInt(input[i], 10);
}

time.sort((a, b) => a - b);

let right = time[time.length-1]*M;
let left = 0;

const sol = () => {
    while(left < right) {
        let mid = Math.floor((right + left)/2);
        const cnt = time.reduce((acc, cur) => acc + Math.floor(mid/cur), 0);
        if(mid === right) {
            console.log(right);
            return;
        }
        if(cnt >= M) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    console.log(left);
}

sol();