/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 * 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。
 * 你可以对一个单词进行如下三种操作：
 * 插入一个字符、删除一个字符、替换一个字符
 * 
 * 例：word1 = "intention", word2 = "execution"  输出：5
 *    i n t e n t i o n
 * e
 * x
 * e
 * c
 * u
 * t
 * i
 * o
 * n
 * 
 * 题目分析：
 *  将s1转换为s2，用二维数组dp[m][n]来记录
 * 两个指针从后往前分别便利s1、s2
 * dp[i][j]表示s1前i个字符到s2前j个字符的最短编辑距离 当s1[i]匹配上s2[j]存在转移四种情况：
 * 1）s1[i] === s1[j]，编辑距离不变为：dp[i-1][j-1]
 * 2) 不相等，转移到dp[i][j]有三种选择
 *    2.1）插入：dp[i][j - 1] + 1
 *    2.2）删除：dp[i - 1][j] + 1
 *    2.3) 替换： dp[i - 1][j - 1] + 1
 * 3）初始状态：【第一行，表示s1为空字符串】/ 【第一列，表示s2为空字符串】
 * 4) 状态转移：dp[i][j] = dp[i-1][j-1] | min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1]) + 1;
 *  
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    if (word1.length <= 1 || word2.length <= 1) {
        return word1 === word2 ? 0 : 1;
    }
    const dp = new Array(word1.length + 1).fill(0).map(() => new Array(word2.length + 1).fill(0));
    for (let i = 1; i <= word1.length; i++) {
        dp[i][0] = i;
    }
    for (let j = 1; j <= word2.length; j++) {
        dp[0][j] = j;
    }
    for (let i = 1; i <= word1.length; i++) {
        for (let j = 1; j <= word2.length; j++) {
            if (word1.charAt(i - 1) === word2.charAt(j - 1)) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = Math.min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1]) + 1;
            }
        }
    }
    return dp[word1.length][word2.length]
};
// @lc code=end

console.log(minDistance('apple', 'rad'))


