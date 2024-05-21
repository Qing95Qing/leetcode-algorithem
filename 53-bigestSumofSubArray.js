/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 子数组 是数组中的一个连续部分
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    if (nums.length < 1) {
        return nums[0]
    }
    let res = nums[0];
    for(let i = 1; i < nums.length; i++) {
        nums[i] = nums[i - 1] > 0 ? nums[i - 1] + nums[i] : nums[i];
        res = Math.max(res, nums[i]);
    }
    return res;
};
// @lc code=end

