// // const fs = require("fs");
// // let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const T = Number.parseInt(input[0]);

const findWord = (W, K) => {
    const map = new Map();
    const words = [];
    
    for(let i=0;i<W.length;i++) {
        if(!map.has(W[i])) {
            map.set(W[i], [1, i]);
        } else {
            const arr = [...map.get(W[i]), i];
            arr[0] += 1;
            map.set(W[i], arr);
        }
    }

    console.log(map);

    map.forEach((v) => {
        if(v[0] >= K) {
            for(i=v.length-1;i>=K;i--) {
                words.push(v[i] - v[i-K+1] + 1);
            }
        }
    });

    if(words.length === 0) {
        console.log(-1);
    } else {
        words.sort((a,b) => a-b);
        console.log(words[0] + " " + words[words.length-1]);
    }

    console.log(words);
}

for(let i=1;i<=T*2;i+=2) {
    const W = input[i];
    const K = Number.parseInt(input[i+1]);
    findWord(W,K);
}