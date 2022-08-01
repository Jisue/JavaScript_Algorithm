const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n');

const [N, S] = input[0].split(" ").map(Number);
const numArr = input[1].split(" ").map(Number);

let start = 0;
let end = 0;
let min = Number.MAX_VALUE;

console.log(numArr);

let sum = numArr[0];
while(start < N && end < N) {
    console.log("start: " + start + " end: " + end + " sum: " + sum);
    if(sum >= S) {
        if(min > end - start + 1) {
            min = end - start + 1;
        }
    }
    
    if(sum <= S) {
        end++;
        sum += numArr[end];
    } else {
        sum -= numArr[start];
        start++;
    }
}

min === Number.MAX_VALUE ? console.log(0) : console.log(min);