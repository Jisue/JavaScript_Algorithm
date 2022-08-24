// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

//[마을 개수, 트럭의 용량]
const [N, C] = input[0].split(" ").map(Number);

// 박스 정보 개수
const M = Number.parseInt(input[1]);

// [박스를 보내는 마을 번호, 박스를 받는 마을번호, 박스의 개수]
const box = [];
for(let i=2;i<=M+1;i++) {
    box.push(input[i].split(" ").map(Number));
}

box.sort((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]);

const getTotal = () => {
    let sum = 0;
    const amount = Array.from({length: N+1}, () => 0);
    
    for(let i=0;i<box.length;i++) {
        const [s, e, num] = box[i];
 
        // 트럭이 C만큼 차는 경우
        const temp = amount.slice(s, e);
        const max = Math.max(...temp);
        const onTruck = Math.min(C - max, num);
        for(let j=s;j<e;j++) {
            amount[j] += onTruck;
        }
        sum += onTruck;
    }
    return sum;
}

console.log(getTotal());