// 벼룩 시장
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const [N] = input[0].split(" ").map(Number);
const info = input[1].split(" ").map(Number);

const buy = [];
const sale = [];

for(let i=0;i<info.length;i++) {
    if(info[i] > 0) {
        sale.push([info[i], i]);
    } else {
        buy.push([info[i], i]);
    }
}

let left = 0;
let right = 0;
let total = 0;

while(left < buy.length && right < sale.length) {
    const diff = Math.abs(buy[left][0] + sale[right][0]);

    if(diff == 0) {
        // 판매 금액 === 구매 금액
        total += sale[right][0] * Math.abs(buy[left][1] - sale[right][1]);
        left++;
        right++;
    } else if(buy[left][0] + sale[right][0] < 0) {
        // 구매 금액이 더 큼
        total += sale[right][0] * Math.abs(buy[left][1] - sale[right][1]);
        buy[left][0] = diff*-1;
        right++;
    } else if(buy[left][0] + sale[right][0] > 0) {
        // 판매 금액이 더 큼
        total += buy[left][0] * -1 * Math.abs(buy[left][1] - sale[right][1]);
        sale[right][0] = diff;
        left++;
    }
}

console.log(total);