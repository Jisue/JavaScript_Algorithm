// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [N] = input[0].split(" ").map(Number);
const top = [0, ...input[1].split(" ").map(Number)];

const ret = Array.from({length: N}, () => 0);

const temp = [];
while(top.length !== 1) {
    const [num, idx] = [top.pop(), top.length];

    while(temp.length !== 0) {
        const [tNum, tIdx] = temp[temp.length - 1];
        if(tNum <= num) {
            ret[tIdx-1] = idx;
            temp.pop();
        } else {
            break;
        }

    }
    temp.push([num, idx]);
}

console.log(ret.join(" "));