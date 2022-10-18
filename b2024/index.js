const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');
const [M] = input[0].split(" ").map(Number);
const line = [];
for(let i=1;i<input.length-1;i++) {
    const [s, e] = input[i].split(" ").map(Number);;
    line.push([s, e]);
}
line.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

const pickLine = (idx, cnt, end) => {
    let maxNum = -1;

    while(idx < line.length) {
        const [s, e] = line[idx];
        if(s <= end) {
            if(e > maxNum) {
                maxNum = e;
            }
        } else {
            break;
        }
        idx++;
    }

    if(maxNum === -1) {
        console.log(0);
        return;
    }
    cnt++;
    if(maxNum >= M) {
        console.log(cnt);
        return;
    }
    pickLine(idx, cnt, maxNum)
}

pickLine(0, 0, 0);