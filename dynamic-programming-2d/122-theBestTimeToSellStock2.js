/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 * 
 * 给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。
 * 在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
 * 返回 你能获得的 最大 利润 。
 * 
 * * 思路：
 * prices记录n天股票价格，每天都可以买入和卖出，第j天卖出，在上一次卖出的时间m后找一天i买入，使得prices[j] - prices[i]最大化
 * 121-股票问题1： 是在 [1 ~ n]中找i，j使得收益最高, 通过minPrices变量记录[1 ~ j]的最低价格
 * 122-股票问题2：增加了依赖关系，本次卖出时间依赖上一次卖出时间
 *  增加了上一次卖出的变量m，问题转化为了找多个m，使得所有[m ~ n]中存在i, j使得收益最高
 * 
 * - 一维dp【没写出来】
 * - base case: dp[i]记录第i天前卖出的最大收益，minPrice记录[i,j - 1]间的最低价格，
 * - 状态转移：dp[j] = max(dp[i], dp[i] + prices[j] - prices[i])
 * 
 * - 二维dp
 * - base case：dp[i][j]记录第i天买入，第j天卖出的最大收益
 * - 状态转移
 *  - 本次收益：prices[j] - prices[i]
 *  - 历史收益：第i-1天前最大收益 dp[i][j-1]
 * 
 * 输入：prices = [7,1,5,3,6,4]
 * 输出：7
 * 解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3 。
     总利润为 4 + 3 = 7 。

         seal
*   buy   |  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |
*          【7】  【1】  【5】  【3】 【6】  【4】
*  0【7】  |  0  |  0  |  0  |  0  |  0  |  0  |  X  |  √  |  √  |
*  1【1】        |  0  |  4  |  4  |  5  |  5  |  X  |  √  |  √  |
*  2【5】              |  4  |  4  |  5  |  5  |  X  |  √  |  √  |
*  3【3】                    |  4  |  7  |  6  |  X  |  √  |  √  |
*  4【6】                          |  7  |  7  |  X  |  √  |  √  |
*  5【4】                                |  7  |  X  |  √  |  √  |
第4天买入
 */
// 一维dp无法记录上一次什么时候是最佳卖出时机
var maxProfit = function(prices) {
    if (prices.length === 1) {
        return 0;
    }
    const dp = new Array(prices.length).fill(0);
    let minPrice = prices[0], maxProfit = 0, lastSeal = 0;
    dp[0] = 0;
    for (let i = 1; i < prices.length; i++) {
        if (minPrice > prices[i - 1]) {
            minPrice = prices[i - 1];
        }
        dp[i] = Math.max(dp[i - 1], dp[i - 1] + prices[i] - minPrice);
    }
    return dp[prices.length - 1];
};

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (prices.length === 1) {
        return 0;
    }
    const dp = new Array(prices.length).fill(0).map(() => new Array(prices.length).fill(0));
    for (let i = 0; i < prices.length; i++) {
        for (let j = i; j < prices.length; j++) {
            // 买入卖出同一天
            if(i === j && i > 0) {
                dp[i][j] = dp[i-1][j];
            } else {
                if (i > 0) {
                    dp[i][j] = Math.max(dp[i - 1][j - 1] + Math.max(0, prices[j] - prices[i]), dp[i-1][j]);
                } else {
                    Math.max(0, prices[j] - prices[i]);
                }
            }

        }
        
    }
    return dp[prices.length - 1][prices.length - 1];
};
// @lc code=end

console.log(maxProfit([7,1,5,3,6,4]))

