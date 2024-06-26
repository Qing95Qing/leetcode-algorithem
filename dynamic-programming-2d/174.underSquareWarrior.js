/*
 * @lc app=leetcode.cn id=174 lang=javascript
 *
 * [174] 地下城游戏
 * 恶魔们抓住了公主并将她关在了地下城 dungeon 的 右下角 。地下城是由 m x n 个房间组成的二维网格。我们英勇的骑士最初被安置在 左上角 的房间里，他必须穿过地下城并通过对抗恶魔来拯救公主。
 * 骑士的初始健康点数为一个正整数。如果他的健康点数在某一时刻降至 0 或以下，他会立即死亡。
 * 有些房间由恶魔守卫，因此骑士在进入这些房间时会失去健康点数（若房间里的值为负整数，则表示骑士将损失健康点数）；其他房间要么是空的（房间里的值为 0），要么包含增加骑士健康点数的魔法球（若房间里的值为正整数，则表示骑士将增加健康点数）。
 * 为了尽快解救公主，骑士决定每次只 向右 或 向下 移动一步。
 * 返回确保骑士能够拯救到公主所需的最低初始健康点数。
 * 注意：任何房间都可能对骑士的健康点数造成威胁，也可能增加骑士的健康点数，包括骑士进入的左上角房间以及公主被监禁的右下角房间。
 * 
 * 输入：dungeon = [
 *  [-2,-3,3],
 *  [-5,-10,1],
 *  [10,30,-5]]
 * 输出：7
 * 解释：如果骑士遵循最佳路径：右 -> 右 -> 下 -> 下 ，则骑士的初始健康点数至少为 7 。
 * 
 * 题目分析：
 * 在某一时刻下降到0就会死亡 => 不是求到达终点的路径和最大值，而是所有经过点的最大值
 */

// 第一次解答：最大路径和【出错，到达终点路径上的最小值会影响路径选择】
// 第二次解答：二维dp的每个元素是包含两个值[当前最大路径和, 历史最小值]， 【出错，当前历史最小值大于后面的最小值，但在当前错误影响决策】
// leetcode热评分析：这道题的dp是倒序的，这点很重要，为什么不能像【最小路径和】一样是正序的？
// 因为【最小路径和】是无状态的，你会发现【最小路径和】倒序dp也是可以的，这道题由于有“加血”的过程，只能依赖后面的值判断需要的血量。
// 所以这里的dp[i][j]表达的意思是：“从（i，j）出发，到达终点需要最少的血量”。
// 因此，正序的含义为“从起点出发，到达位置（i，j）所需要的最少血量”；倒序的含义是“从（i，j）出发，到达终点需要最少的血量”。初始血量本来就是要求的，所以只能倒序dp
// @lc code=start
/**
 * @param {number[][]} dungeon
 * @return {number}
 */


// 逆向dp，dp[i, j]表示[i, j]到终点[m, n]所需的最少健康点数
// 初始化：dp[m-1, n-1]
var calculateMinimumHP = function(dungeon) {
    if ( dungeon.length == 1 && dungeon[0].length == 1) {
        return Math.max(1, 1 - dungeon[0][0]);
    }
    let rows = dungeon.length, cols = dungeon[0].length; 
    
    const dp = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
    // 初始化终点
    dp[rows - 1][cols - 1] = Math.max(1, 1 - dungeon[rows - 1][cols - 1]);

    // 初始化最后一行，dp[i][j]只能从【右】转移而来
    if (cols > 1) {
        for (let i = cols - 2; i >= 0; i--) {
            dp[rows - 1][i] = Math.max(1, dp[rows - 1][i + 1] - dungeon[rows - 1][i]);
        }
    }
    // 初始化最后一列，dp[i][j]只能从【下】转移而来
    if (rows > 1) {
        for (let i = rows - 2; i >= 0; i--) {
            dp[i][cols - 1] = Math.max(1, (dp[i + 1][cols - 1] - dungeon[i][cols - 1]));
        }
    }
    
    for (let i = rows - 2; i >= 0; i--) {
        for (let j = cols - 2; j >= 0; j--) {
            // dp[i][j] 可以从【下】也可以从【右】移动过来
            dp[i][j] = Math.max(1, Math.min(dp[i][j + 1], dp[i + 1][j]) - dungeon[i][j]);
        }
    }
    return dp[0][0];
};
// @lc code=end

// console.log(calculateMinimumHP([[-2,-3,3],[-5,-10,1],[10,30,-5]]))
// [
// [1,-3,3],
// [0,-2,0],
// [-3,-3,-3]
// ]

// 正向dp，dp[i, j]表示从[0, 0]到[i, j]的最小健康点书，
// 错误原因: 正向dp是无状态的，本题要求移动过程中健康点书也不能将为0，需要依赖前面的健康消耗
var calculateMinimumHP_Failed = function(dungeon) {
    let rows = dungeon.length, cols = dungeon[0].length; 
    
    const dp = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
    // 更改点1: 第一个元素记录到达当前点的累积最大值，第二个元素记录到达当前点路径上存在的最小值
    dp[0][0] = [dungeon[0][0], dungeon[0][0]];
    // 初始化第一行
    if (cols > 1) {
        for (let i = 1; i < cols; i++) {
            const curMax = dungeon[0][i] + dp[0][i - 1][0];
            dp[0][i] = [curMax, Math.min(curMax, dp[0][i - 1][1])];
        }
    }
    // 初始化第一列
    if (rows > 1) {
        for (let i = 1; i < rows; i++) {
            const curMax = dungeon[i][0] + dp[i - 1][0][0];
            dp[i][0] = [curMax, Math.min(curMax, dp[i - 1][0][1])];
        }
    }

    if (cols > 1 && rows > 1) {
        for (let i = 1; i < rows; i ++) {
            for (let j = 1; j < cols; j++) {
                // top path
                let topCur = dp[i-1][j][0] + dungeon[i][j];
                let leftCur = dp[i][j-1][0] + dungeon[i][j];
                let fromTopMin = Math.min(topCur, dp[i-1][j][1]);
                let fromLeftMin = Math.min(leftCur, dp[i][j-1][1]);
                dp[i][j] = fromTopMin > fromLeftMin ? [topCur, fromTopMin]: [leftCur, fromLeftMin];
            }
        }
    }
    console.log(dp)
    return dp[rows - 1][cols - 1][1] > 0 ? 1 : 1 - dp[rows - 1][cols - 1][1];
};
console.log(calculateMinimumHP([[1,-3,3],[0,-2,0],[-3,-3,-3]]))

