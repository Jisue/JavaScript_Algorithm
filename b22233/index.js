// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const keyWord = new Set();
for(let i=1;i<N+1;i++) {
    keyWord.add(input[i].replace(/\r/g, ""));
}

let cnt = keyWord.size;

for(let i=N+1;i<N+M+1;i++) {
    const memo = input[i].replace(/\r/g, "").split(",");
    for(let i=0;i<memo.length;i++) {
        if(keyWord.has(memo[i])) {
            keyWord.delete(memo[i]);
            cnt--;
        }
    }
    console.log(cnt);
}