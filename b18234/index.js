// 당근 훔쳐 먹기
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N, T] = input[0].split(" ").map(Number);

const carrot = [];

for(let i=1;i<=N;i++) {
    // [기본, 영양제]
    carrot.push(input[i].split(" ").map(Number));
}

carrot.sort((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]);

let day = T - N;
let ret = 0;
for(let i=0;i<N;i++) {
    const [w, p] = carrot[i];
    ret += (w + p*day);
    day++;
}

console.log(ret);