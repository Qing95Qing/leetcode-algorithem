/*
 * @lc app=leetcode.cn id=304 lang=javascript
 *
 * [304] 二维区域和检索 - 矩阵不可变
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
    this.preSum = new Array(matrix.length).fill(0).map(() => ([]))
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            // 第一个元素
            if (i === 0 && j === 0) {
                this.preSum[0][0] = matrix[0][0];
                continue;
            }
            // 第一行元素
            if (i === 0 && j > 0) {
                this.preSum[i][j] = this.preSum[i][j - 1] + matrix[i][j];
                continue;
            }
            // 第一列元素
            if (j === 0 && i > 0) {
                this.preSum[i][j] = this.preSum[i - 1][j] + matrix[i][j];
                continue;
            }
            
            this.preSum[i][j] = this.preSum[i - 1][j] + this.preSum[i][j-1] - this.preSum[i - 1][j - 1] + matrix[i][j];
        }
    }
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    if (row1 === 0 && col1 === 0) {
        return this.preSum[row2][col2];
    }
    if (row1 === 0) {
        return this.preSum[row2][col2] - this.preSum[row2][col1 - 1];
    }
    if (col1 === 0) {
        return this.preSum[row2][col2] - this.preSum[row1 - 1][col2];
    }
    return this.preSum[row2][col2] - this.preSum[row1 - 1][col2] - this.preSum[row2][col1 - 1] + this.preSum[row1 - 1][col1 - 1];
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
// @lc code=end

var matrix = [
    [3,0,1,4,2],
    [5,6,3,2,1],
    [1,2,0,1,5],
    [4,1,0,1,7],
    [1,0,3,0,5]];
var obj = new NumMatrix(matrix)
var param_1 = obj.sumRegion(2,1,4,3)

console.log(param_1, '1111')