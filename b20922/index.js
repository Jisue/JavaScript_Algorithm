const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N, K] = input[0].split(" ").map(Number);

const nums = input[1].split(" ").map(Number);

const arr = Array.from({length: 100001}, () => 0);

let left = 0;
let right = 0;
let max = 0;
while(left <= right && right < N) {
    const now = nums[right];
    arr[now]++;
    if(arr[now] > K) {
        max = Math.max(max, right - left);
        while(arr[now] > K) {
            const temp = nums[left];
            arr[temp]--;
            left++;
        }
    }
    right++;
}
max = Math.max(max, right - left);
console.log(max);