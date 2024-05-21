/*
 * @lc app=leetcode.cn id=322 lang=typescript
 *
 * [322] 零钱兑换
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
 * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
 * 你可以认为每种硬币的数量是无限的。
 * 题解：
 * 假设有1、2、5三种面值的硬币，需要凑m元
 * 凑到m元，最后一个面值三种可能：1、2、5，则问题转化为求
 * f(m) = Math.min(f(m - 1), f(m - 2), f(m - 5)) + 1
 * 所以计算从1 ~ m每个值最少需要的数量
 */

// @lc code=start
function coinChange(coins: number[], amount: number): number {
    const record = new Array(amount + 1).fill(-1);
    record[0] = 0;
    for (let i = 1; i <= amount; i++) {
      let cur = Number.MAX_SAFE_INTEGER - 1;
      for (let j = 0; j < coins.length; j++) {
        if (i - coins[j] >= 0) {
          cur = Math.min(record[i - coins[j]], cur);
        }
      }
      record[i] = cur + 1;
    }
    return record[amount] === Number.MAX_SAFE_INTEGER ? -1 : record[amount];
};
// @lc code=end

// console.log(coinChange([2,5,10,1], 27))
console.log(coinChange([2], 3))

