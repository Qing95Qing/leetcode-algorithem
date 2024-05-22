/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 * 
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 *子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 * 
 * 输入：nums = [10,9,2,5,3,7,101,18]
 * 输出：4
 * 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
 * 
 * 解题思路：
 * 1）第n个元素与谁关联 => 子序列，若n前第i、j、k元素值比第n个元素值小，找【i】、【j】、【k】的最长子序列
 * 2）状态转移方程 => ，f(n) = max(f(i), f(j), f(k)) + 1
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    if (nums.length <= 1) {
        return nums.length;
    }
    const record = new Array(nums.length).fill(1);
    let res = 1;
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                record[i] = Math.max(record[i], record[j] + 1)
            }
        }
        res = Math.max(res, record[i]);
    }
    return res;
};
// @lc code=end

