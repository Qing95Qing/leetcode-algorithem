/*
 * @lc app=leetcode.cn id=309 lang=javascript
 *
 * [309] 买卖股票的最佳时机含冷冻期
 * 
 * 给定一个整数数组prices，其中第  prices[i] 表示第 i 天的股票价格 。​
 * 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
 * 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 
 * 示例：
 * 输入: prices = [1,2,3,0,2]
 * 输出: 3 
 * 解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
 * 
 * 相较于买卖股票2，多了冷冻期，增加了买入的限制条件，
 * 第i天
 * - 持有/买入：   [i-1](不持有/不操作) - prices[i]  
 * - 持有/不操作： max([i-1](持有/买入), [i-1](持有/不操作))
 * - 不持有/不操作： max([i-1](不持有/不操作), [i-1](不持有/卖出))
 * - 不持有/卖出：  max([i-1](持有/买入), [i-1](持有/不操作)) + prices[i]
 * [1, 2, 4]
 *          持有/买入    持有/不操作    不持有/不操作     不持有/卖出    
 *   1day     -1           -max          0           -max
 *   2day     -2           -1            0            1
 *   3day     -4           -1            1
 *   4day
 *   5day
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let oneBuy = -prices[0], 
        oneNo = -Number.MAX_VALUE,
        zeroNo = 0,
        zeroSell = -Number.MAX_VALUE;

    for (let i = 1; i < prices.length; i++) {
        let oneBuy1 = zeroNo -prices[i];
        let oneNo1 = Math.max(oneBuy, oneNo);
        let zeroNo1 = Math.max(zeroNo, zeroSell);
        let zeroSell1 = Math.max(oneBuy, oneNo) + prices[i];

        oneBuy = oneBuy1;
        oneNo = oneNo1;
        zeroNo = zeroNo1;
        zeroSell = zeroSell1;
    }

    return Math.max(oneBuy, oneNo, zeroSell, zeroNo);
};
// @lc code=end

console.log(maxProfit([1,2,4]))
// buy



