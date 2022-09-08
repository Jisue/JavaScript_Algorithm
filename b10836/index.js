const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [M, N] = input[0].split(" ").map(Number);
const temp = Array.from({length: 2*M-1}, () => 1);

for(let i=1;i<=N;i++) {
    const [a, b, c] = input[i].split(" ").map(Number);
    let idx = a;
    for(let i=idx;i<idx+b;i++) {
        temp[i] += 1;
    }
    idx += b;
    for(let i=idx;i<idx+c;i++) {
        temp[i] += 2;
    }
}

let str = temp.slice(M, 2*M).join(" ");
let idx = M-1;
let answer = "";
for(let i=0;i<M;i++) {
    answer += temp[idx] + " " + str + "\n";
    idx--;
}

console.log(answer);