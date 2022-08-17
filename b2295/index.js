// // const fs = require("fs");
// // let input = fs.readFileSync("/dev/stdin").toString().split('\n');
// const fs = require("fs");
// let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// const [N] = input[0].split(" ").map(Number);

// // console.log(N);

// const set = [];

// for(let i=1;i<=N;i++) {
//     set.push(Number.parseInt(input[i]));
// }

// const binarySearch = (target, arr) => {
//     let low = 0;
//     let high = arr.length -1;

//     while(low < high) {
//         let mid = Math.floor((high + low)/2);
//         if(target < arr[mid]) {
//             high = mid - 1;
//         } else if(target > arr[mid]) {
//             low = mid + 1;
//         } else {
//             return true;
//         }
//     }
//     return false;
// }

// const getMax = () => {
//     const xy = [];

//     for(let i=0;i<N;i++) {
//         for(let j=0;j<N;j++) {
//             xy.push(set[i] + set[j]);
//         }
//     }

//     xy.sort((a,b) => a - b);

//     for(let i=N-1;i>=0;i--) {
//         for(let j=0;j<i;j++) {
//             if(binarySearch(set[i]-set[j], xy)) {
//                 return set[i];
//             }
//         }
//     }
// }

// console.log(getMax());


const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [N] = input[0].split(" ").map(Number);

// console.log(N);

const set = [];

for(let i=1;i<=N;i++) {
    set.push(Number.parseInt(input[i]));
}

const binarySearch = (target, arr) => {
    let low = 0;
    let high = arr.length -1;

    while(low < high) {
        let mid = Math.floor((high + low)/2);
        if(target < arr[mid]) {
            high = mid - 1;
        } else if(target > arr[mid]) {
            low = mid + 1;
        } else {
            return true;
        }
    }
    return false;
}

const getMax = () => {
    const xy = new Set();

    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            xy.add(set[i] + set[j]);
        }
    }
    
    let max = 0;
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            const num = set[i] - set[j];
            if(num < 0) {
                continue;
            }
            if(xy.has(num) && max < set[i]) {
                max = set[i];
            }
        }
    }
    return max;
}

console.log(getMax());