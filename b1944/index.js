// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");

function kruskal(n, arr) {
  // 부모 노드 찾기
  function getParent(set, x) {
    if (set[x] === x) return x;
    return (set[x] = getParent(set, set[x]));
  }

  // 두 개의 노드를 같은 부모 노드로 병합
  function unionParent(set, a, b) {
    a = getParent(set, a);
    b = getParent(set, b);

    // 더 작은 값으로 부모 노드 할당
    if (a < b) set[b] = a;
    else set[a] = b;
  }

  // 같은 부모 노드를 갖는지 확인
  function findParent(set, a, b) {
    a = getParent(set, a);
    b = getParent(set, b);

    if (a === b) return true;
    else return false;
  }

  // 간선의 비용으로 오름차순 정렬
  arr.sort((a, b) => a[2] - b[2]);

  // 사이클 확인을 위한 배열 생성
  // 각 노드가 어느 그래프에 포함되어 있는지 확인하기 위해
  const set = new Array(n);
  for (let i = 1; i <= n; i++) {
    set[i] = i;
  }

  let coast = 0;
  for (let i = 0; i < arr.length; i++) {
    // 동일한 부모를 가르키지 않는 경우에만 선택 -> 사이클이 발생하지 않는 경우
    if (!findParent(set, arr[i][0], arr[i][1])) {
      coast += arr[i][2]; // 비용 추가
      unionParent(set, arr[i][0], arr[i][1]); // 노드 연결
    }
  }

  return coast;
}

const [N, M] = input[0].split(" ").map(Number);
const graph = Array.from({ length: M + 1 }, () => Array(M + 1).fill(Number.MAX_VALUE));
const miro = [];

let index = 0;
let map = new Map();

// 미로 정보 저장
for (let i = 1; i <= N; i++) {
  miro.push(input[i]);
  for (let j = 0; j < N; j++) {
    if (miro[i - 1][j] === 'S' || miro[i - 1][j] === 'K') {
      map.set((i - 1) + " " + j, index);
      index++;
    }
  }
}

const bfs = (sx, sy, miro) => {
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];
  const visit = Array.from({ length: N }, () => Array(N).fill(false));
  const robot = [];
  robot.push([sx, sy, 0]);
  let cnt = 0;
  while (robot.length !== 0) {
    const [x, y, move] = robot.shift();
    visit[x][y] = true;
    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];
      if (nx >= N || ny >= N || nx < 0 || ny < 0 || visit[nx][ny] || miro[nx][ny] === '1') {
        continue;
      }
      if (miro[nx][ny] === 'K' || miro[nx][ny] === 'S') {
        miro[nx][ny] = '0';
        cnt++;
        const [a, b] = [map.get(sx + " " + sy), map.get(nx + " " + ny)];
        if (graph[a][b] === 0) {
          graph[a][b] = move + 1;
        } else {
          graph[a][b] = Math.min(move + 1, graph[a][b]);
        }
        if (cnt === M) {
          return true;
        }
      }
      robot.push([nx, ny, move + 1]);
      visit[nx][ny] = true;
    }
  }
  return false;
}

let find = true;
map.forEach((v, k) => {
  const [x, y] = k.split(" ").map(Number);
  if(!bfs(x, y, miro)) {
    find = false;
  }
})

if(find) {
  const edge = [];
  for (let i = 0; i < M + 1; i++) {
    for (let j = i + 1; j < M + 1; j++) {
      edge.push([i, j, Math.min(graph[i][j], graph[j][j])]);
    }
  }

  console.log(kruskal(M+1, edge));
} else {
  console.log(-1);
}