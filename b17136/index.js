// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const board = [];
let paperCount = 0;
for (let i = 0; i < 10; i++) {
    board.push(input[i].split(" ").map(Number));
    for (let j = 0; j < 10; j++) {
        if (board[i][j] === 1) {
            paperCount++;
        }
    }
}

const check = (x, y, n) => {
    for(let i=x; i<x+n; i++) {
        for(let j=y; j<y+n; j++) {
            if(i >= 10 || j >= 10 || board[i][j] != 1) return false;
        }
    }
    return true;
}
const paper = Array.from({length: 6}, () => 5);

let min = Infinity;
const dfs = (x, y, cnt) => {
    if(x >= 9 && y > 9) {
        min = Math.min(min, cnt);
        return;
    }
    if(y > 9) {
        dfs(x+1, 0, cnt);
        return;
    }
    if(board[x][y] === 1) {
        let n = 5;
        while(n >= 1) {
            if(paper[n] > 0 && check(x, y, n)) {
                for(let i=x; i<x+n; i++) {
                    for(let j=y; j<y+n; j++) {
                        board[i][j] = 0;
                    }
                }
                paper[n]--;
                dfs(x, y+1, cnt+1);
                for(let i=x; i<x+n; i++) {
                    for(let j=y; j<y+n; j++) {
                        board[i][j] = 1;
                    }
                }
                paper[n]++;
            }
            n--;
        }
    } else {
        dfs(x, y+1, cnt);
    }
}

dfs(0, 0, 0);

console.log(min === Infinity ? -1 : min);