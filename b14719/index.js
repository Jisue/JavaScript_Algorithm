// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [H, W] = input[0].split(" ").map(Number);

const drop = input[1].split(" ").map(Number);


let total = 0;
let s = 0;
let temp = 0;
for(let i=s+1;i<drop.length;i++) {
    if(drop[s] <= drop[i]) {
        total += temp;
        temp = 0;
        s = i;
    } else {
        temp += drop[s] - drop[i];
    }
}

temp = 0;
let e = drop.length - 1;
for(let i=e;i>=s;i--) {
    if(drop[e] <= drop[i]) {
        total += temp;
        temp = 0;
        e = i;
    } else {
        temp += drop[e] - drop[i];
    }
}

console.log(total);
/*
      0
0     0
0     0
0   0 0
*/