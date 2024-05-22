/*
 * @lc app=leetcode.cn id=88 lang=typescript
 *
 * [88] 合并两个有序数组
 * 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
 * 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
 * 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
 * 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
 * 输出：[1,2,2,3,5,6] 
*/

// @lc code=start
/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let p1 = m - 1, p2 = n - 1, end = m + n - 1;
  while(end >= 0 && p2 >= 0) {
      if (p1 < 0 || nums1[p1] < nums2[p2]) {
          nums1[end] = nums2[p2];
          p2 -= 1;
      } else {
          nums1[end] = nums1[p1];
          p1 -= 1;
      }
      end -= 1;
  }
};
// @lc code=end
let nums1 = [1,2,3,0,0,0];
let nums2 = [2,5,6]
merge(nums1, 3, nums2, 3)

