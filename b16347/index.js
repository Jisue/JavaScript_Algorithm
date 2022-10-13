const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N] = input[0].split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
const island = Array.from({ length: N + 1 }, () => 0);

for (let i = 2; i <= N; i++) {
    let [t, a, p] = input[i - 1].split(" ").map(String);
    a = Number.parseInt(a);
    p = Number.parseInt(p);
    graph[p].push(i);
    if (t === 'W') {
        island[i] = -a;
    } else {
        island[i] = a;
    }
}

// 1까지의 모든 경로를 구함
let answer = 0;
const dfs = (node, root) => {
    if(graph[node].length === 0) {
        let total = 0;
        for (let j = root.length - 1; j >= 0; j--) {
            const num = root[j];
            const temp = total;
            total += island[num];
            if (island[num] < 0) {
                island[num] += temp;
            }
            if (island[num] > 0) {
                island[num] = 0;
            }
            if (total < 0) {
                total = 0;
            }
        }
        answer += total;
    }
    for (let i = 0; i < graph[node].length; i++) {
        const nextNode = graph[node][i];
        root.push(nextNode);
        dfs(nextNode, root);
        root.pop();
    }
}

dfs(1, []);
console.log(answer);