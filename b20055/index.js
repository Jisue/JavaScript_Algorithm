// // const fs = require("fs");
// // let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);

const container = input[1].split(" ").map(Number);

const solution = () => {
    let on = 0;
    let off = N - 1;
    let zero = 0;
    let cnt = 0;
    let robot = [];

    while (zero < K) {
        // 한칸 회전
        on === 0 ? on = 2*N-1 : on--;
        off === 0 ? off = 2*N-1 : off--;

        // 로봇 이동
        for (let i = 0; i < robot.length; i++) {
            if(robot[i] === off) { // 회전하며 도착한 로봇 내림
                robot[i] = -1;
            } else { // 로봇 한칸 이동
                let next = robot[i] + 1;
                if (next === 2 * N) {
                    next = 0;
                }
                // 로봇이 움직일 수 있음
                if (container[next] > 0 && !robot.includes(next)) {
                    container[next]--;
                    if (container[next] === 0) {
                        zero++;
                    }
                    next === off ? robot[i] = - 1 : robot[i] = next;
                }
            }
        }

        robot = robot.filter((i) => i !== -1);

        // 올리는 칸에 올리기
        if (container[on] > 0) {
            robot.push(on);
            container[on]--;
            if (container[on] === 0) {
                zero++;
            }
        }
        cnt++;
    }
    console.log(cnt);
}
solution();