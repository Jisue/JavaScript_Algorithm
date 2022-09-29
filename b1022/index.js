const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [r1, c1, r2, c2] = input[0].split(" ").map(Number);

const N = Math.max(Math.abs(r1), Math.abs(c1), Math.abs(r2), Math.abs(c2));

const [x1, x2, y1, y2] = [r1+N, r2+N, c1+N, c2+N];

const board = Array.from({length: x2- x1 + 1}, () => Array(y2-y1+1).fill(0));

const checkIn = (x, y) => {
    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
}

//cnt는 1, 3, 5, 7, 9 ... 늘어날 예정임

// 오른쪽 1칸, 위로 cnt칸, 왼쪽 cnt+1칸, 아래 cnt+1칸, 오른쪽 cnt+1칸 종료

let len = 1;
const fillBoard = (x, y, idx, cnt) => {
    if(idx === (2*N + 1)*(2*N+1)) {
        return;
    }
    //오른쪽 1칸 이동
    y++;
    idx++;
    if(checkIn(x, y)) {
        board[x-x1][y-y1] = idx;
        len = Math.max(idx.toString().length, len);
    }

    // 위로 cnt칸 이동
    for(let i=0;i<cnt;i++) {
        x--;
        idx++;
        if(checkIn(x, y)) {
            board[x-x1][y-y1] = idx;
            len = Math.max(idx.toString().length, len);
        }
    }

    // 왼쪽 cnt+1칸 이동
    for(let i=0;i<cnt + 1;i++) {
        y--;
        idx++;
        if(checkIn(x, y)) {
            board[x-x1][y-y1] = idx;
            len = Math.max(idx.toString().length, len);
        }
    }

    // 아래 cnt+1칸 이동
    for(let i=0;i<cnt + 1;i++) {
        x++;
        idx++;
        if(checkIn(x, y)) {
            board[x-x1][y-y1] = idx;
            len = Math.max(idx.toString().length, len);
        }
    }

    // 오른쪽 cnt+1칸 이동
    for(let i=0;i<cnt + 1;i++) {
        y++;
        idx++;
        if(checkIn(x, y)) {
            board[x-x1][y-y1] = idx;
            len = Math.max(idx.toString().length, len);
        }
    }
    fillBoard(x, y, idx, cnt += 2);
}

if(checkIn(N, N)) {
    board[N-x1][N-y1] = 1;
}

fillBoard(N, N, 1, 1);

let str = "";
for(let i=0;i<board.length;i++) {
    for(let j=0;j<board[0].length;j++) {
        // 앞에 공백 추가
        const numLen = board[i][j].toString().length;
        if(numLen < len) {
            str += " ".repeat(len - numLen);
        }

        if(j < board[0].length-1) {
            str += board[i][j] + " ";
        } else if(i < board.length-1) {
            str += board[i][j] + '\n';
        } else {
            str += board[i][j];
        }
    }
}
console.log(str);