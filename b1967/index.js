const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N] = input[0].split(" ").map(Number);

const tree = Array.from({length: N+1}, () => []);

for(let i=1;i<N;i++) {
    const [a, b, c] = input[i].split(" ").map(Number);
    tree[a].push([b, c]);
    tree[b].push([a, c]);
}

const bfs = (s) => {
    const visit = Array.from({length: N+1}, () => 0);
    const queue = [];
    queue.push([s, 0]);
    let farNode = { node: 0, dist: 0 };
    
    while(queue.length !== 0) {
        const[node, dist] = queue.shift();
        if(visit[node]) {
            continue;
        }
        visit[node] = 1;

        if(farNode.dist < dist) farNode = {node, dist};

        for(let [nN, nD] of tree[node]) {
            queue.push([nN, dist + nD]);
        }
    }
    return farNode;
}

console.log(bfs(bfs(1).node).dist);