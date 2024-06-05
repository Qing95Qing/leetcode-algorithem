/*
 * @lc app=leetcode.cn id=188 lang=javascript
 *
 * [188] 买卖股票的最佳时机 IV
 * 
 * 给你一个整数数组 prices 和一个整数 k ，其中 prices[i] 是某支给定的股票在第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。也就是说，你最多可以买 k 次，卖 k 次。
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 
 * 示例：
 * 输入：k = 2, prices = [2,4,1]
 * 输出：2
 * 解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
 * 
 * 解题思路：
 * - 第i天后
 *  - 偶数天：最多能买【i / 2】次，最多能卖【i / 2】次
 *  - 奇数数天：最多能买【i / 2】+ 1次，最多能卖【i / 2】次
 *  穷举：（n表示买入次数，m表示卖出次数，n/m表示第i的交易情况）
 *      - 第1天：0/0 1/0
 *      - 第2天：0/0 1/0 1/1
 *      - 第3天：0/0 1/0 1/1 2/1
 *      - 第4天：0/0 1/0 1/1 2/1 2/2
 *      - 第5天：0/0 1/0 1/1 2/1 2/2
 *      - 
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(k, prices) {
    if (prices.length <= 1) {
        return 0;
    }
    let record = new Array(2 * k + 1).fill(0);
    let days = prices.length, profit = 0;
    // 第一天买入
    record[1] = -prices[0];
    // i表示第i天
    for (let i = 2; i <= days; i++) {
        let newRecord = new Array(2 * k + 1).fill(0);
        for (let j = 1; j <= 2 * k; j++) {
            if (j > i) {
                break;
            }

            if (j % 2 === 1) {
                // 偶数次状态是多一次买入，本次【买入 / 不买入】
                newRecord[j] = record[j - 1] - prices[i - 1];
                if (j < i) {
                    newRecord[j] = Math.max(newRecord[j], record[j]);
                }
            } else {
                // 奇数次状态是买入和卖出次数相等，本次【卖出 / 不卖出】
                newRecord[j] = record[j - 1] + prices[i - 1];  // 本次卖出
                if (i >= 3) {
                    newRecord[j] = Math.max(newRecord[j], record[j]);
                }
            }
            profit = Math.max(profit, newRecord[j]);
        }
        // console.log(i, prices[i - 1], record, newRecord)
        record = newRecord;
    }
    return profit; 
};
// @lc code=end

var maxProfit_opt = function(k, prices) {
    if (!prices.length) {
        return 0;
    }

    const n = prices.length;
    k = Math.min(k, Math.floor(n / 2));
    const buy = new Array(k + 1).fill(-Number.MAX_VALUE);
    const sell = new Array(k + 1).fill(-Number.MAX_VALUE);

    [buy[0], sell[0]] = [-prices[0], 0]

    for (let i = 1; i < n; ++i) {
        buy[0] = Math.max(buy[0], sell[0] - prices[i]);
        for (let j = 1; j < k + 1; ++j) {
            buy[j] = Math.max(buy[j], sell[j] - prices[i]);
            sell[j] = Math.max(sell[j], buy[j - 1] + prices[i]); 
        }
    }
    return Math.max(...sell)
};
console.log(maxProfit_opt(2, [1,7,4,2,11]))

