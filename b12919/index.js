const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n');

const S = input[0].replace(/\r/g, "");
const T = input[1].replace(/\r/g, "");

let find = false;
const changWord = (word) => {
    const queue = [];
    queue.push(word);
    while (queue.length !== 0) {
        const str = queue.shift();
        console.log(str);
        if (str.length === S.length) {
            if (str === S) {
                find = true;
                break;
            }
            continue;
        }
        if(str[str.length-1] === "A") {
            queue.push(str.slice(0,str.length-1));
        }
        if(str[0] === "B") {
            queue.push(str.split('').reverse().join('').slice(0,str.length-1));
        }
    }
}

changWord(T);

find ? console.log(1) : console.log(0);