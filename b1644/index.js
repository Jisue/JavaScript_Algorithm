const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n');

const N = parseInt(input[0]);

function getPrime(n){
    const primes = [];
    const check = Array(n+1).fill(true);
    let m = Math.floor(Math.sqrt(n));

    //i = 2 부터 i의 배수를 모두 true로 지웁니다.
    //이때, 이미 지워진 숫자는 continue합니다.
    for(let i = 2; i <= m; i++){
        if(check[i]){
            primes.push(i);
            let temp = i+i;
            while(temp < check.length){
                check[temp] = false;
                temp += i;
            }
        }
    }
    for(let i = m+1; i < check.length; i++){
        if(check[i]) primes.push(i);
    }
    
    return primes;
}

const arr = getPrime(N);

let start = 0;
let end = 0;
let cnt = 0;
let sum = arr[0];

while(start < arr.length && end < arr.length) {
    if(sum === N) {
        cnt++;
    }

    if(sum <= N) {
        end++;
        sum += arr[end];
    } else {
        sum -= arr[start];
        start++;
    }
}

console.log(cnt);