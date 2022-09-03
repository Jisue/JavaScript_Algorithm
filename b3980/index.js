const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [C] = input[0].split(" ").map(Number);

let max = 0;

const dfs = (position, idx, visit, total) => {
    if(idx === 11) {
        if(total > max) {
            max = total;
        }
        return;
    }

    position[idx].forEach(element => {
        const [i, score] = element;
        if(!visit[i]) {
            visit[i] = true;
            dfs(position, idx + 1, visit, total + score);
            visit[i] = false
        }
    });
}

const setPosition = (position) => {
    const visit = Array.from({length: 11}, () => false);
    dfs(position, 0, visit, 0);
}

for(let i=0;i<C;i++) {
    const position = Array.from({length: 11}, () => []);
    max = 0;
    for(let j=0;j<11;j++) {
        const temp = input[11*i+1 + j].split(" ").map(Number);
        for(let k=0;k<11;k++) {
            if(temp[k] > 0) {
                position[j].push([k, temp[k]]);
            }
        }
    }
    setPosition(position);
    console.log(position);
    console.log(max);
}