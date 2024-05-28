/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

 * '.' 匹配任意单个字符
 * '*' 匹配零个或多个前面的那一个元素
 * 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 * 字符串s为 "aa", p为"a*"
 * 解题思路：
 * 1）基础状态：dp[i][j]记录子字符串s[0 ~ i]与p[0 ～ j]的匹配情况
 * 2）状态转移：如果s[0 ~ i-1]子串满足匹配模式，要转移到dp[i][j]根据p[j]的值可能存在三种情况
 *    2.1）s[i] === p[j]: true， 从左上角移动dp[i-1][j-1]
 *    2.2) p[j] === '.': true，  从左上角移动dp[i-1][j-1]
 *    2.3) p[j] === '* : 当前*存在两种情况【匹配0次】 or 【匹配1次】
 *       匹配1次（aa, a*） dp[i - 1][j]，（条件：s.charAt(i) === p.charAt(j - 1)）  
 *       匹配0次（ab, ac*b） dp[i][j - 2] 理解错误：*匹配前面元素0次表示没有c
 * 
 * 解题思路对了，编码思路乱了，对于递归的处理有点乱
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    const dp = new Array(s.length + 1).fill(0).map(() => new Array(p.length + 1).fill(false));
    dp[0][0] = true;

    const matches = (i, j) => {
        if (i === 0) {
            return false;
        }
        if (p.charAt(j - 1) === '.') {
            return true;
        }
        return s.charAt(i - 1) === p.charAt(j - 1);
    }

    for (let i = 0; i <= s.length; i++) {
        for (let j = 1; j <= p.length; j++) {
            if (p.charAt(j - 1) === '*') {
                // 匹配1次 || 匹配0次
                    dp[i][j] = (matches(i, j - 1) && dp[i-1][j]) || dp[i][j-2];
            } else {
                if (matches(i, j)) {
                    dp[i][j] = dp[i-1][j-1]
                } else {
                    dp[i][j] = false;
                }
            }
            // console.log(s.charAt(i - 1), p.charAt(j - 1), i, j, dp[i][j])
        }
    }
    // console.log(dp)
    return dp[s.length][p.length];
};

// @lc code=end

console.log(isMatch("aaa", "ab*a*c*a"))
// 1, 5

{/**
*            0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |
*               |  a  |  b  |  *  |  a  |  *  |  c  |  *  |  a  |
*  0     |   √  |  X  |  X  |  X  |  X  |  X  |  X  |  X  |  X  |
*  1  a  |   \  |  √  |  X  |  √  |  X  |  √  |  X  |  √  |  √  |
*  2  a
*  3  a
*/}


// 错误对的：动态规划 + 递归
// 代码运行结果有问题
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch_1 = function(s, p) {
    const dp = new Array(s.length).fill(undefined).map(() => new Array(p.length).fill(undefined));
    dp[0][0] = s[0] === p[0] || p[0] === '.';
    // if (s.length === 1 || p.length === 1) {
    //     return s.length === p.length ? dp[0][0] : false;
    // }
    return checkCharMatch(s, p, 0, 0, dp)
};

function checkCharMatch(s, p, i, j, dp) { 
    console.log(s, p, i, j, dp)   
    // s或p中有一串已经遍历完
    if (i >= s.length || j >= p.length) {
        // s和p都已经遍历完了
        if (i === s.length && j === p.length) {
            return true;
        }else if (j < p.length) {
            for (let m = j; m < p.length; m++) {
                if (p.charAt(m) !== '*') {
                    return false;
                }
            }
        }
        return false;
    } 
    if (dp[i][j] !== undefined) return dp[i][j] ? checkCharMatch(s, p, i+1, j+1, dp) : false;
    let res = true;
    if (s.charAt(i) === p.charAt(j) || p.charAt(j) === '.') {
        res = true;
    } else if (p.charAt(j) === '*') {
        res = checkCharMatch(s, p, i, j - 1, dp) || checkCharMatch(s, p, i, j + 1, dp);
    } else {
        res = false;
    }
    dp[i][j] = res;
    if (res) {
        return checkCharMatch(s, p, i + 1, j + 1, dp);
    }
    return res;
}

