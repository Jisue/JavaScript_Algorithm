// 빌런 호석
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N, K, P, X] = input[0].split(" ").map(Number);

/*
1~N층, K개 디스플레이, 최대 P개 반전, 현재 X층
*/

// 숫자 정보를 저장 -> 1 켜짐, 0 꺼짐
const bitMap = new Map();

bitMap.set("0", parseInt("1111110", 2));
bitMap.set("1", parseInt("0000110", 2));
bitMap.set("2", parseInt("1011011", 2));
bitMap.set("3", parseInt("1001111", 2));
bitMap.set("4", parseInt("0100111", 2));
bitMap.set("5", parseInt("1101101", 2));
bitMap.set("6", parseInt("1111101", 2));
bitMap.set("7", parseInt("1000110", 2));
bitMap.set("8", parseInt("1111111", 2));
bitMap.set("9", parseInt("1101111", 2));

const display = Array.from({length: K}, () => []);

const changeFloor = (now, idx) => {
    const bitNum = bitMap.get(now);

    bitMap.forEach((value, key) => {
        const cnt = (bitNum ^ value).toString(2).split("").filter((e) => e === '1').length;
        if(cnt <= P) {
            display[idx].push([key, cnt]);
        }
    })
}

const str = X.toString().split("");
// 0으로 앞 빈칸을 채움
for(let i=0;i<K-str.length;i++) {
    str.unshift("0");
}

for(let i=0;i<str.length;i++) {
    changeFloor(str[i], i);
}

// 반전이 완료된 숫자들을 저장
let answer = 0;

const bfs = (idx, ret, total) => {
    if(total > P) {
        return;
    }
    if(idx >= K) {
        if(total >= 1 && total <= P && ret - '1' >= 0 && ('' + N) - ret >= 0) {
            answer++;
        }
        return;
    }
    for(let i=0;i<display[idx].length;i++) {
        const [nextNum, nextMove] = display[idx][i];
        bfs(idx + 1, ret + nextNum, total + nextMove);
    }
}

bfs(0, "", 0);

console.log(answer);