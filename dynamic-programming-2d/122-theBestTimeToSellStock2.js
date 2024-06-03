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
 * /
 

/**
 * - 一维dp【没写出来】
 * - base case: dp[i]记录第i天前卖出的最大收益，minPrice记录[i,j - 1]间的最低价格，
 * - 状态转移：dp[j] = max(dp[i], dp[i] + prices[j] - prices[i])
*/
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

/**
* - 二维dp：思路错了[超时了]
 * - base case：dp[i][j]记录第i天买入，第j天卖出的最大收益
 * - 状态转移
 *  - 本次收益：prices[j] - prices[i]
 *  - 历史收益：第i-1天前最大收益 dp[i - 1][j]
 * 
 * 
 * 输入：prices = [7,1,5,3,6,4]
 * 输出：7
 * 解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3 。
     总利润为 4 + 3 = 7 。

         seal
*   buy   |  0  |  1  |  2  |  3  |  4  |  5  |
*          【7】  【1】  【5】  【3】 【6】  【4】
*  0【7】  |  0  |  0  |  0  |  0  |  0  |  0  |
*  1【1】        |  0  |  4  |  4  |  5  |  5  |
*  2【5】              |  4  |  4  |  5  |  5  |
*  3【3】                    |  4  |  7  |  6  |
*  4【6】                          |  7  |  7  |
*  5【4】                                |  7  |
*/

var maxProfit_2d = function(prices) {
    if (prices.length === 1) {
        return 0;
    }
    let oldRecord = new Array(prices.length).fill(0);
    for (let i = 0; i < prices.length; i++) {
        let newRecord = new Array(prices.length).fill(0);
        for (let j = i; j < prices.length; j++) {
            // 买入卖出同一天
            if (i === j) {
                newRecord[j] = oldRecord[j];
            } else {
                newRecord[j] = oldRecord[j - 1] + Math.max(0, prices[j] - prices[i]);
            }
        }
        oldRecord = newRecord;
    }
    return oldRecord[prices.length - 1];
};

/**
 * 正确方法一： 贪心算法
 */
var maxProfit_greedy = function(prices) {
    if (prices.length === 1) {
        return 0;
    }
    let profit = 0;
    for (let i = 1; i < prices.length; i++) {
        const temp = prices[i] - prices[i - 1];
        if (temp > 0) {
            profit += temp;
        }
    }
    return profit;
};
/**
 * 正确方法二： 动态规划：
 * - 基础状态：每天交易结束后只可能存在手里【有一支股票】或者【没有股票】的状态
 * - 状态转移：
 *   - dp[i][0]表示第i天不持有股票：max(dp[i-1][0], dp[i-1][1] + prices[i])
 *     - 取决于前一天是否持有
 *          - 前一天不持有，则第i天收益不变：dp[i-1][0]
 *          - 前一天持有，则第i天卖出：dp[i-1][1] + prices[i]
 *   - dp[i][1]表示第i天持有股票：max(dp[i-1][1], dp[i-1][0] - prices[i])
 *     - 取决于前一天是否持有
 *          - 前一天不持有，则第i天买入：dp[i-1][0] - prices[i]
 *          - 前一天持有，则第i天收益不变：dp[i-1][1] + prices[i]
 * - 优化： 第i天的收益情况只与第i-1天相关，使用两个变量记录i-1天的情况
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (prices.length === 1) {
        return 0;
    }
    let lastNone = 0, lastHave = -(prices[0]);
    for (let i = 1; i < prices.length; i++) {
        let curNone = Math.max(lastNone, lastHave + prices[i]);
        let curHave = Math.max(lastHave, lastNone - prices[i]);
        lastNone = curNone;
        lastHave = curHave;
    }
    return Math.max(lastNone, lastHave);
};
// @lc code=end
{/**
    seal
*   buy   |  0  |  1  |  2  |  3  |  4  |  5  |
*          【1】  【2】  【3】  【4】 【5】  
*  0【1】  |  0  |  0  |  0  |  0  |  0  |  0  |
*  1【2】        |  0  |  4  |  4  |  5  |  5  |
*  2【3】              |  4  |  4  |  5  |  5  |
*  3【4】                    |  4  |  7  |  6  |
*  4【5】                          |  7  |  7  |
*  5【6】                                |  7  |
*/}

console.log(maxProfit([1, 2, 3, 4, 5]))

