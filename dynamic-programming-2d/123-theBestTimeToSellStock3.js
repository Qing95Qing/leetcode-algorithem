/*
 * @lc app=leetcode.cn id=123 lang=javascript
 *
 * [123] 买卖股票的最佳时机 III
 * 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 
 * 示例：
 * 输入：prices = [3,3,5,0,0,3,1,4]
 * 输出：6
 * 解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
   第i天有三种种可能 卖出 / 买入 / 不动
         
*         |  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |
*          【3】  【3】  【5】  【0】 【0】  【3】  【1】  【4】
*  0【3】  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |
*  1【3】  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |
*  2【5】  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |
*  3【0】  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |
*  4【0】  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |
*  5【3】  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |
*  5【1】  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |
*  5【4】  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |
 */

/** 动态规划——错误思路
 * Map = {
 *  index：profit 
 * }
 * - 持有：
 *  - 当天买入：dp[i - 1][无] - prices[i]
 *  - 当天不操作: dp[i - 1][持有]
 * - 无
 *  - 当天卖出：dp[前一状态][持有] + prices[i]
 *  - 当天不操作：dp[前一状态][无]
 * 对于122，由于没有交易次数的限制，当天的交易情况只有考虑前一天的
 * 
 * 
 * 动态规划正确思路
 * 只能交易两次，手上最多持有一股
 * 第i天结束后，存在五种情况
 * 1）未进行任何操作
 * 2）买入了一次  max(dp[i-1][0/0] - prices[i], dp[i-1][1/0])
 * 3）买入一次，卖出一次  max(dp[i-1][1/0] + prices[i], dp[i-1]dp[1/1])
 * 4）买入两次，卖出一次  max(dp[i-1][1/1] - prices[i], dp[i-1]dp[2/1])
 * 5）两次交易全部结束   max(dp[i-1][2/1] + prices[i], max[i-1][2/2])
 * 
 * 
 *         0/0   1/0    1/1   2/1   2/2 
 * 【3】 |  0  |  -3  |  0  |  0  |  0  |
 * 【3】 |  0  |  -3  |  0  |  0  |  0  |
 * 【5】 |  0  |  -3  |  0  |  0  |  0  |
 * 【0】 |  0  |  0   |  -3 |  
 * 【0】
 * 【3】
 * 【1】
 * 【4】
 */  

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (prices.length <= 1) {
    return 0;
  }
  // 五维分别记录第i结束后的情况：不进行任何操作、买1次、买1卖1、买2卖1、买2卖2
  let record = new Array(4).fill(0), maxProfit = 0;
  record[0] = -prices[0];
  for (let i = 1; i< prices.length; i++) {
    let newRecord = new Array(4).fill(0);
    // 本次买入 or 历史买1
    newRecord[0] = Math.max(-prices[i], record[0]);
    // 本次卖出 or 历史买1卖1
    newRecord[1] = Math.max(record[0] + prices[i], record[1]);
    if (i >= 2) {
      // 本次买入 or 历史买2卖1
      newRecord[2] = record[1] - prices[i];
    }
    if (i >= 3) {
      newRecord[2] = Math.max(newRecord[2], record[2])
      // 本次卖出 or 历史买2卖2
      newRecord[3] = record[2] + prices[i]; 
    }
    if (i >= 4) {
      newRecord[3] = Math.max(newRecord[3], record[3]);
    }
    maxProfit = Math.max(...newRecord);
    record = newRecord;
  }
  return maxProfit;
};
// @lc code=end

/**
 *         0/0   1/0    1/1   2/1   2/2 
 * 【1】 |  0  |  -1  |  0  |  0  |  0  |
 * 【2】 |  0  |  -1  |  1  |  0  |  0  |
 * 【3】 |  0  |  -1  |  2  |  -1  |  0  |
 * 【4】 |  0  |  0   |  -3 |  
 * 【5】
 */


var maxProfit_opt = function(prices) {
  const n = prices.length;
  let buy1 = -prices[0], buy2 = -prices[0];
  let sell1 = 0, sell2 = 0;
  for (let i = 1; i < n; i++) {
      buy1 = Math.max(buy1, -prices[i]);
      sell1 = Math.max(sell1, buy1 + prices[i]);
      buy2 = Math.max(buy2, sell1 - prices[i]);
      sell2 = Math.max(sell2, buy2 + prices[i]);
  }
  return sell2;
};
console.log(maxProfit([1,2,3,4,5]))
