const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');
const [N, M] = input[0].split(" ").map(Number);
const nodes = [];
for(let i=1;i<=M;i++) {
    nodes.push(input[i].split(" ").map(Number));
}
const parents = Array.from({length: N+1}, () => -1)
const find = (x) => {
    if(parents[x] < 0) {
        return x;
    }
    parents[x] = find(parents[x]);
    return parents[x];
}

const union = (x, y) => {
    x = find(x);
    y = find(y);
    if(x != y) {
        parents[x] = y;
    }
}

let ans = [];
for(let i=0;i<M;i++) {
    const [opt, a, b] = nodes[i];
    let A = find(a);
    let B = find(b);
    // union 연산
    if(opt === 0) {
        union(a, b);
    } else {
        if(find(a) === find(b)) {
            ans.push('yes');
        } else {
            ans.push('no');
        }
    }
}

console.log(ans.join('\n'));
