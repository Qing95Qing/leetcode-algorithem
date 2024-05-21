/*
 * @lc app=leetcode.cn id=1248 lang=javascript
 *
 * [1248] 统计「优美子数组」
 * 给你一个整数数组 nums 和一个整数 k。如果某个连续子数组中恰好有 k 个奇数数字，我们就认为这个子数组是「优美子数组」。
 * 请返回这个数组中 「优美子数组」 的数目。
 * [1,1,2,1,1]
 * f(i) 记录0～i中奇数的个数
 * j～i中奇数的个数为f(i) - f(j - 1)
 * f(i) - f(j - 1) = k
 * 方案：
 * 1）【前缀和】使用preSum记录前i个元素中奇数的个数，那么f(i + 1) = 【f(i) + 1 or f(i)】
 * 2）【哈希表】为避免循环找j，使用哈希表，key为奇数的个数，value为满足奇数个数的j的数量
 * 3）数组一次遍历：更新【前缀和】，从【哈希表】中获取满足f(i) - f(j - 1) = k的j的数量
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarrays = function(nums, k) {
    let preSum = 0, res = 0;
    let map = new Map();
    map.set(0, 1);
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 1) {
            // 第i位为奇数时，更新前缀和与哈希表
            preSum += 1;
        } 
        if (map.has(preSum)) {
            map.set(preSum, map.get(preSum) + 1);
        } else {
            map.set(preSum, 1);
        }
        // 获取满足f(j - 1) = f(i) - k的j的数量
        const need = preSum - k;
        res += map.has(need) ? map.get(need) : 0;
    }
    return res;
};
// @lc code=end

const input = [1,1,2,1,1];
console.log(numberOfSubarrays(input, 3));


