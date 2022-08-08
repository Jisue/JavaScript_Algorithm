const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n');

const [N] = input[0].split(" ").map(Number);

const num = input[1].split(" ").map(Number);

num.sort((a, b) => a - b);

let cnt = 0;
for (let i = 0; i < N; i++) {
    let left = 0;
    let right = N-1;

    while(left < right) {
        if(left === i) {
            left++;
            continue;
        }
        if(right === i) {
            right--;
            continue;
        }
        let sum = num[left] + num[right];
        if(sum === num[i]) {
            cnt++;
            break;
        } else if(sum > num[i]) {
            right--;
        } else {
            left++;
        }
    }
}
console.log(cnt);