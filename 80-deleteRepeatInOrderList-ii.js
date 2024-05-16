/*
 * @lc app=leetcode.cn id=80 lang=javascript
 *
 * [80] 删除有序数组中的重复项 II
 */

/* 
给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度。
不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
*/

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * [0,0,1,1,1,1,2,3,3]
 */
var removeDuplicates = function(nums) {
    if (nums.length <= 2) {
        return nums.length;
    }
    let counter = 1, left = 1, right = nums.length;
    while (left < right) {
        if (nums[left - 1] === nums[left] && counter === 2) {
            for (let j = left; j < right; j++) {
                let temp = nums[j + 1];
                nums[j + 1] = nums[j];
                nums[j] = temp;
            }
            right -= 1;
        } else if (nums[left - 1] !== nums[left]) {
            counter = 1;
            left += 1;
        } else {
            counter += 1;
            left += 1;
        }
    }
    return right;
};
// @lc code=end

// 标准解——快慢指针
var removeDuplicates = function(nums) {
    const n = nums.length;
    if (n <= 2) {
        return n;
    }
    let slow = 2, fast = 2;
    while (fast < n) {
        if (nums[slow - 2] != nums[fast]) {
            nums[slow] = nums[fast];
            ++slow;
        }
        ++fast;
    }
    return slow;
};
