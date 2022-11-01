const N = 10;
const dp = Array.from({length: N+1}, () => -1);
const fibonacci = (n) => {
    dp[0] = 0, dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
}
fibonacci(10);
console.log(dp);