const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N, D] = input[0].split(" ").map(Number);
const road = [];

for(let i=1;i<=N;i++) {
    const [s, e, d] = input[i].split(" ").map(Number);
    if(e > D) {
        continue;
    }
    road.push([s, e, d]);
}

let min = Infinity;
const dfs = (position, dist) => {
    if(dist > min) {
        return;
    }
    
    // 도착 지점 D에 도착
    if(position === D) {
        min = Math.min(min, dist);
        return;
    }

    // 지름길을 타는 경우
    for(let i=0;i<road.length;i++) {
        const [s, e, d] = road[i];
        if(s >= position) {
            dfs(e, dist + d + s - position);
        }
    }

    // 지름길은 안타는 경우
    min = Math.min(min, D - position + dist);
}

dfs(0, 0);

console.log(min);