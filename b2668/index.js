const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N] = input[0].split(" ").map(Number);
const num = Array.from({length:N+1}, () => 0);
for(let i=1;i<=N;i++) {
    num[i] = Number.parseInt(input[i]);
}

const result = new Set();
const rotate = (idx, arr, cnt) => {
    if(arr.includes(idx)) {
        const temp = arr.slice(arr.indexOf(idx), cnt);
        temp.forEach((e) => {
            result.add(e);
        })
        return;
    }
    arr[cnt] = idx;
    rotate(num[idx], arr, cnt + 1);
}

for(let i=1;i<=N;i++) {
    rotate(i, [], 0);
}

const answer = [...result];
answer.sort((a, b) => a - b);
answer.unshift(result.size);
console.log(answer.join('\n'));