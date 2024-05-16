/*
 * @lc app=leetcode.cn id=560 lang=javascript
 *
 * [560] 和为 K 的子数组
 * [3, 2, 4, 2, 3, 6]
 * 
 * [3, 5]
 * [0, 2]
 */


// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    const preSum = new Array(nums.length).fill(0).map(() => new Array(nums.length).fill(0));
    preSum[0][0] = nums[0];
    let counter = 0;
    if (preSum[0][0] === k) {
        counter += 1;
    }
    
    for (let i = 1; i < nums.length; i++) {
        preSum[i][i] = nums[i];
        if (preSum[i][i] === k) {
            counter += 1;
        }
        for (let j = 0; j < i; j++) {
            preSum[j][i] = preSum[j][i - 1] + nums[i];
            if (preSum[j][i] === k) {
                counter += 1;
            }
        }
    }
    return counter;
};
// @lc code=end

