const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().split('\n');

const handleStack = (opt, stack, num) => {
    let top = stack.length-1;
    let ret = 0;
    switch (opt) {
        case 'NUM':
            stack.push(num);
            break;
        case 'POP':
            if(top < 0) {
                return false;
            }
            stack.pop();
            break;
        case 'INV':
            if(top < 0) {
                return false;
            }
            stack[top] *= -1;
            break;
        case 'DUP':
            if(top < 0) {
                return false;
            }
            stack.push(stack[top]);
            break;
        case 'SWP':
            if(top < 1) {
                return false;
            }
            const temp = stack[top];
            stack[top] = stack[top-1];
            stack[top-1] = temp;
            break;
        case 'ADD':
            if(top < 1) {
                return false;
            }
            ret = stack[top-1] + stack[top];
            // if(Math.abs(ret) > Math.pow(10, 9)) {
            //     return false;
            // }
            stack[top-1]  = ret;
            stack.pop();
            break;
        case 'SUB':
            if(top < 1) {
                return false;
            }
            ret = stack[top-1] - stack[top];
            // if(Math.abs(ret) > Math.pow(10, 9)) {
            //     return false;
            // }
            stack[top-1]  = ret;
            stack.pop();
            break;
        case 'MUL':
            if(top < 1) {
                return false;
            }
            ret = stack[top-1] * stack[top];
            // if(Math.abs(ret) > Math.pow(10, 9)) {
            //     return false;
            // }
            stack[top-1]  = ret;
            stack.pop();
            break;
        case 'DIV':
            if(top < 1 || stack[top] === 0) {
                return false;
            }
            ret = Math.abs(stack[top-1]) / Math.abs(stack[top]);
            if((stack[top-1] < 0 && stack[top] > 0) || (stack[top] < 0 || stack[top-1] > 0)) {
                ret *= -1;
            }
            stack[top-1]  = ret;
            stack.pop();
            break;
        case 'MOD':
            if(top < 1 || stack[top] === 0) {
                return false;
            }
            ret = Math.abs(stack[top-1]) % Math.abs(stack[top]);
            if((stack[top-1] < 0 && stack[top] > 0) || (stack[top] < 0 || stack[top-1] > 0)) {
                ret *= -1;
            }
            stack[top-1]  = ret;
            stack.pop();
            break;
        default:
            break;
    }
    for(let i=0;i<stack.length;i++) {
        if(stack[i] > 1000000000 || stack[i] < -1000000000) {
            return false;
        }
    }
    return true;
}

const operation = (opts, nums, num) => {
    let stack = [num];
    let idx = 0;
    for(let i=0;i<opts.length;i++) {
        let n = 0;
        if(opts[i] === 'NUM') {
            n = nums[idx];
            idx++;
        }
        if(!handleStack(opts[i], stack, n)) {
            return 'ERROR';
        }
    }
    if(stack.length === 1) {
        return stack[0];
    }
    return 'ERROR';
}

let operations = [];
let nums = [];
let answer = '';
for (let i = 0; i < input.length-1; i++) {
    const opt = input[i].slice(0, 3);
    if(opt === 'NUM') {
        const num = Number.parseInt(input[i].slice(4));
        nums.push(num);
    }
    if(opt === 'END') {
        const N = Number.parseInt(input[i+1]);
        for(let j=i+2;j<i+2+N;j++) {
            const num = Number.parseInt(input[j]);
            const ret = operation(operations, nums, num);
            answer += ret + '\n';
        }
        operations = [];
        nums = [];
        i += N+2;
        if(input[i+1].slice(0, 4) === 'QUIT') {
            break;
        }
        answer += '\n';
        continue;
    }
    operations.push(opt);
}

console.log(answer);