/*
 * @lc app=leetcode.cn id=714 lang=javascript
 *
 * [714] 买卖股票的最佳时机含手续费
 *
 * 给定一个整数数组 prices，其中 prices[i]表示第 i 天的股票价格 ；整数 fee 代表了交易股票的手续费用。
 * 你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。
 * 返回获得利润的最大值。
 * 注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。
 *
 * 输入：prices = [1, 3, 2, 8, 4, 9], fee = 2
 * 输出：8
 *
 * 分析：
 * 第i天有四种：
 * 持有/不操作、持有/买入、不持有/不操作、不持有/卖出
 * haveNoOpr[i] = Math.max(haveNoOpr[i - 1], haveBuy[i - 1]);
 * haveBuy[i] = Math.max(noneNoOpr[i - 1], noneSell[i - 1]) - prices[i];
 * noneNoOpr[i] = Math.max(noneNoOpr[i - 1], haveSell[i - 1]);
 * noneSell[i] = Math.max(haveNoOpr[i - 1], haveBuy[i - 1]) + price[i] - fee;
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */

// 优化内存
var maxProfit = function (prices, fee) {
	if (prices.length < 2) {
		return 0;
	}
	let haveNoOpr = -Number.MAX_SAFE_INTEGER,
		haveBuy = -prices[0],
		noneNoOpr = 0,
		noneSell = -Number.MAX_SAFE_INTEGER;
	for (let i = 1; i < prices.length; i++) {
		let haveNoOprTemp = Math.max(haveNoOpr, haveBuy);
		let haveBuyTemp = Math.max(noneNoOpr, noneSell) - prices[i];
		let noneNoOprTemp = Math.max(noneNoOpr, noneSell);
		let noneSellTemp = Math.max(haveNoOpr, haveBuy) + prices[i] - fee;
		haveNoOpr = haveNoOprTemp;
		haveBuy = haveBuyTemp;
		noneNoOpr = noneNoOprTemp;
		noneSell = noneSellTemp;
	}
	return Math.max(haveNoOpr, haveBuy, noneNoOpr, noneSell);
};

// @lc code=end

// 效率没有内存优化后的效率高
var maxProfit_array = function (prices, fee) {
	if (prices.length < 2) {
		return 0;
	}
	const days = prices.length;
	let haveNoOpr = new Array(days).fill(0),
		haveBuy = new Array(days).fill(0),
		noneNoOpr = new Array(days).fill(0),
		noneSell = new Array(days).fill(0);
	haveNoOpr[0] = -Number.MAX_SAFE_INTEGER;
	haveBuy[0] = -prices[0];
	noneNoOpr[0] = 0;
	noneSell[0] = -Number.MAX_SAFE_INTEGER;
	for (let i = 1; i < days; i++) {
		haveNoOpr[i] = Math.max(haveNoOpr[i - 1], haveBuy[i - 1]);
		haveBuy[i] = Math.max(noneNoOpr[i - 1], noneSell[i - 1]) - prices[i];
		noneNoOpr[i] = Math.max(noneNoOpr[i - 1], noneSell[i - 1]);
		noneSell[i] = Math.max(haveNoOpr[i - 1], haveBuy[i - 1]) + prices[i] - fee;
	}
	console.log(haveNoOpr, haveBuy, noneNoOpr, noneSell);

	return Math.max(
		haveNoOpr[days - 1],
		haveBuy[days - 1],
		noneNoOpr[days - 1],
		noneSell[days - 1]
	);
};

let prices = [1, 3, 2, 8, 4, 9],
	fee = 2;
console.log(maxProfit(prices, fee));
