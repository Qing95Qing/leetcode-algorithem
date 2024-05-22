/*
 * @lc app=leetcode.cn id=303 lang=javascript
 *
 * [303] 区域和检索 - 数组不可变
 */

// @lc code=start
/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    this.nums = nums;
    this.preSum = []
    for (let i = 0; i < nums.length; i += 1) {
        if (i === 0) {
            this.preSum[i] = nums[i];
        } else {
            this.preSum[i] = this.preSum[i - 1] + nums[i];
        }
    }
};

NumArray.prototype.sumRange = function(left, right) {
    return this.preSum[right] - this.preSum[left] + this.nums[left];
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
// @lc code=end

var obj = new NumArray([-2, 0, 3, -5, 2, -1])
var param_1 = obj.sumRange(2, 5)
console.log(param_1)
