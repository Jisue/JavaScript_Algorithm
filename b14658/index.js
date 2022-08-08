const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n');

const [N, M, L, K] = input[0].split(" ").map(Number);

const starts = [];
for(let i=1;i<=K;i++) {
    starts.push(input[i].split(" ").map(Number));
}

let max = 0;
const findStart = (x, y) => {
    let cnt = 0;
    for(let i=0;i<K;i++) {
        if(starts[i][0] >= x && starts[i][0] <= x+L && starts[i][1] >= y && starts[i][1] <= y+L) {
            cnt++;
        }
    }
    if(max < cnt) {
        max = cnt;
    }
}

for(let i=0;i<K;i++) {
    for(let j=0;j<K;j++) {
        findStart(starts[i][0], starts[j][1]);
    }
}

console.log(K - max);