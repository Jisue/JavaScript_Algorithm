const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N, H] = input[0].split(" ").map(Number);
const A = [];
const B = [];

for(let i=1;i<=N;i+=2) {
    A.push(Number.parseInt(input[i]));
    B.push(Number.parseInt(input[i+1]));
}

A.sort((a, b) => a - b);
B.sort((a, b) => a - b);

const binarySearch = (h, arr) => {
    let left = 0;
    let right = N/2;
    while(left < right) {
        let mid = Math.floor((left + right)/2);
        if(arr[mid] >= h) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return N/2 - right;
}

let min = N;
let cnt = 0;

for(let i=1;i<=H;i++) {
    let conflict = binarySearch(i, A) + binarySearch(H - i + 1, B);
    if(min === conflict) {
        cnt++;
        continue;
    }
    if(min > conflict) {
        min = conflict;
        cnt = 1;
    }
}

console.log(min, cnt);