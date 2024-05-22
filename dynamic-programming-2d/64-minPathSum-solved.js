/*
 * @lc app=leetcode.cn id=64 lang=javascript
 *
 * [64] 最小路径和
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 说明：每次只能向下或者向右移动一步。
 * 解题思路： 
 * 1）第(m, n)与谁产生关联 => 到达(m, n)有两种可能：从【(m-1, n)】或【(m, n-1)】，取最小
 * 2）状态转移方程 => f(m, n) = min(f(m-1, n), f(m, n-1))
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const record = Array.from(grid, () => Array.from(grid[0], () => 0));
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (i === 0 && j === 0) {
                record[i][j] = grid[i][j];
                continue;
            }
            if (i === 0) {
                record[i][j] = record[i][j - 1] + grid[i][j];
                continue;
            }
            if (j === 0) {
                record[i][j] = record[i - 1][j] + grid[i][j];
                continue;
            }
            record[i][j] = Math.min(record[i - 1][j], record[i][j - 1]) + grid[i][j];
        }
    }
    return record[grid.length - 1][grid[0].length - 1];
};
// @lc code=end

console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]]))

