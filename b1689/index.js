const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N] = input[0].split(" ").map(Number);
const line = [];
for (let i = 1; i <= N; i++) {
    const [s, e] = input[i].split(" ").map(Number);
    line.push([s, 1]);
    line.push([e, -1]);
}
line.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
console.log(line);

let max = 0;
let cnt = 0;
for (let i = 0; i < line.length; i++) {
    const [point, type] = line[i];
    cnt += type;
    console.log(cnt);
    max = Math.max(cnt, max);

}
console.log(max);