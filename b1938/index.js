// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [N] = input[0].split(" ").map(Number);

// dir 0 == 가로, dir 1 = 세로 방향 정보

const board = [];
let pointB = {};
let pointE = {};

let cntB = 0;
let cntE = 0;

// 보드, 통나무 B와 E 세팅
for(let i=1;i<=N;i++) {
    board.push(input[i].split(""));
    board[i-1].map((item, idx) => {
        if(item === 'B') {
            cntB++;
        }
        if(item === 'E') {
            cntE++;
        }
        if(cntB === 2) {
            let dir = 0;
            if(i-2 >= 0 && board[i-2][idx] === "B") {
                dir = 1;
            }
            pointB = {x: i-1, y: idx, dir: dir, move: 0}
            cntB = NaN;
        }
        if(cntE === 2) {
            let dir = 0;
            if(i-2 >= 0 && board[i-2][idx] === "E") {
                dir = 1;
            }
            pointE = {x: i-1, y: idx, dir: dir, move: 0}
            cntE = NaN;
        }
    })
}

// 이동 X 한지 체크
const checkOut = (x, y) => {
    if(x < 0 || y < 0 || x >= N || y >= N || board[x][y] === '1') {
        return true;
    }
    return false;
}

const bfs = () => {
    const pq = [];
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    const visit = new Map();
    pq.push(pointB);

    let min = Number.MAX_VALUE;
    while(pq.length !== 0) {
        const p = pq.shift();
        const key = p.x + " " + p.y + " " + p.dir;
        if(p.x === pointE.x && p.y === pointE.y && p.dir === pointE.dir) {
            if(min > p.move) {
                min = p.move;
            }
            continue;
        }
        if(visit.has(key)) {
            continue;
        }
        visit.set(key);

        // 이동할 포인트들 추출함
        const points = [];

        // 가로 방향이므로 양옆을 저장
        if(p.dir === 0) {
            points.push({x: p.x, y: p.y - 1});
            points.push({x: p.x, y: p.y});
            points.push({x: p.x, y: p.y + 1});
        } else {
            // 세로 방향이므로 위아래를 저장
            points.push({x: p.x - 1, y: p.y});
            points.push({x: p.x, y: p.y});
            points.push({x: p.x + 1, y: p.y});
        }

        // U, D, L, R
        let canMove;
        for(let i=0;i<4;i++) {
            let canMove = true;
            for(let j=0;j<3;j++) {
                if(checkOut(points[j].x + dx[i], points[j].y + dy[i])) {
                    canMove = false;
                    break;
                }
            }
            if(canMove) {
                pq.push({x: p.x + dx[i], y: p.y + dy[i], dir: p.dir, move: p.move + 1});
            }
        }

        // T
        // 주변 3*3에 전부 나무가 없어야 함
        canMove = true;
        for(let i=p.x-1;i<=p.x+1;i++) {
            for(let j=p.y-1;j<=p.y+1;j++) {
                if(checkOut(i,j)) {
                    canMove = false;
                    break;
                }
            }
        }
        if(canMove) {
            pq.push({x: p.x, y: p.y, dir: p.dir === 0 ? 1 : 0, move: p.move + 1});
        }
    }
    min === Number.MAX_VALUE ? console.log(0) : console.log(min);
}

bfs();