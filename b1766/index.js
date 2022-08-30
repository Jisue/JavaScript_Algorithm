// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const info = Array.from({length: N + 1}, () => []);
const degree = Array.from({length: N + 1}, () => 0);

for(let i=1;i<=M;i++) {
    const [a, b] = input[i].split(" ").map(Number);
    info[a].push(b);
    degree[b]++;
}

const queue = [];
let answer = "";
const visit = Array.from({length: N + 1}, () => false);
for(let i=1;i<=N;i++) {
    if(degree[i] === 0) {
        queue.push(i);
        visit[i] = true;
    }
}

const insertQueue = (num) => {
    queue.push(num);
    let size = queue.length - 1;
    let mid = Math.floor(size / 2);
    while(size >= 1 && (queue[mid] > queue[size])) {
        let temp = queue[mid];
        queue[mid] = queue[size];
        queue[size] = temp;
        size = Math.floor(size / 2);
        mid = Math.floor(size / 2);
    }
}

while(queue.length !== 0) {
    const p = queue.shift();
    answer += p + " ";
    for(let i=0;i<info[p].length;i++) {
        degree[info[p][i]]--;
    }
    for(let i=1;i<=N;i++) {
        if(!visit[i] && degree[i] === 0) {
            insertQueue(i);
            visit[i] = true;
        }
    }
}

console.log(answer);