/*
 * @lc app=leetcode.cn id=560 lang=javascript
 *
 * [560] 和为 K 的子数组
 * [3, 2, 4, 2, 3, 6]
 * 
 * [3, 5]
 * [0, 2]
 */

var subarraySum_mine_failed = function(nums, k) {
    const preSum = new Array(nums.length).fill(0);
    let counter = 0;
    
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j <= i; j++) {
            preSum[j] = preSum[j] + nums[i];
            if (preSum[j] === k) {
                counter += 1;
            }
        }
    }
    return counter;
};

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// [1, 1, 1]
// index: 0 => times: 0 map => { 1: 1 }
// index: 1 => times: 0 map => { 1: 1 }

var subarraySum = function(nums, k) {
    let sum = 0, counter = 0;
    const map = new Map();
    map.set(0, 1);
    // preSum[i] - preSum[j - 1] = k => 有多少个 preSum[i] - k
    for (let num of nums) {
        sum += num;
        // 判断当前i有多少个preSum[j - 1]
        if (map.has(sum - k)) {
            counter += map.get(sum - k);
        }
        // 更新preSum[i]的记录
        if (map.has(sum)) {
            map.set(sum, map.get(sum) + 1);
        } else {
            map.set(sum, 1);
        }
    }
    return counter;
};
// @lc code=end

