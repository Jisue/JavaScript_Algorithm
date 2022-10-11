const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N] = input[0].split(" ").map(Number);
const dice = [];
for(let i=1;i<=N;i++) {
    dice.push(input[i].split(" ").map(Number));
}

const getTop = (idx) => {
    if(idx === 0) {
        return 5;
    } else if(idx === 1) {
        return 3;
    } else if(idx === 2) {
        return 4;
    } else if(idx === 3) {
        return 1;
    } else if(idx === 4) {
        return 2;
    } else {
        return 0;
    }
}

let answer = 0;
const attach = (bottom, sum, idx) => {
    if(idx === N) {
        answer = Math.max(sum, answer);
        return;
    }
    let top = getTop(bottom);
    let max = 0;
    for(let i=0;i<6;i++) {
        if(i === top || i === bottom) {
            continue;
        }
        max = Math.max(dice[idx][i], max);
    }
    let nB = 0;
    if(idx < N - 1) {
        nB = dice[idx+1].indexOf(dice[idx][top]);
    }
    attach(nB, sum + max, idx + 1);
}

for(let i=0;i<6;i++) {
    attach(i, 0, 0);
}

console.log(answer);