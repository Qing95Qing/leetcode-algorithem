/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 * 题目描述：
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 */

/**
 * 解题思路：
 * - 错误——两层遍历超时了
 * - 基础状态：dp[i][j]记录第i天买入，第j天卖出的收益
 * - 状态转移：dp[i][j] = prices[j] - prices[i]
 * 
 * - 修改
 * 分析：找 i, j 使得 prices[j] - prices[i] 的差值最大化
 * 思路：对每个卖出的j，找能使差值最大化的i，即找[0 ~ i-1]的最小值
 * 优化：由于在计算j-1卖出的最大收益时，已经计算出前j-2天股价的最小值minPrice
 * 则第j天卖出的收益最大值，找j-1天股价的最小值，只需计算min(minPrice, prices[j - 1])
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
    let profit = 0, minPrice = prices[0];
    for (let i = 1; i < prices.length; i++) {
        if (prices[i - 1] < minPrice) {
            minPrice = prices[i - 1];
        }
        profit = Math.max(prices[i] - minPrice, profit)
    }
    return profit;
};
// @lc code=end

var maxProfit1 = function(prices) {
    if (prices.length === 1) {
        return 0;
    } 
    let profit = 0, buy = 0, sell = 0;
    // const dp = new Array(prices.length).fill(0).map(() => new Array(prices.length).fill(0));
    for (let i = 0; i < prices.length - 1; i++) {
        // 当前价格比记录的买入价高则丢弃
        if (i > 0 && prices[i] >= prices[buy]){
            continue;
        }
        // 买入时间没超出当前最高卖出时间，使用当前较低买入价
        if (i + 1 <= sell) {
            profit = prices[sell] - prices[i];
            buy = i;
            continue;
        }
        // 买入时间超出当前最高卖出时间，找第i天买入的最佳卖出时间
        for (let j = i + 1; j < prices.length; j++) {
            if (profit <= prices[j] - prices[i]) {
                profit = prices[j] - prices[i];
                buy = i;
                sell = j;
            }
        }
    }
    return profit;
};

