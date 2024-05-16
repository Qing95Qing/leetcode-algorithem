/*
 * @lc app=leetcode.cn id=1371 lang=javascript
 *
 * [1371] 每个元音包含偶数次的最长子字符串
 * 思路: 
 * - 元音字母： 【'a'，'e'，'i'，'o'，'u'】
 * - 满足条件：每个元字母出现偶次
 *  - 1）都出现0次，则是字符串本身的长度
 * - 思路：动态规划
 *  - 状态转移：f(n) = max() 
 * 试🌰： eleetminicoworoep
 * 【0】e 1
 * 【1】l 2
 * 【2】e 3
 * 【3】e 3
 * 【4】t 4
 * 【5】m 5
 * 【6】i 1
 * ...
 * 结果：没写出来🙅，思路错了，
 * eleetmini 【√】
 */

var findTheLongestSubstring_main_error = function(s) {
    const metaLetters = ['a', 'e', 'i', 'o', 'u'];
    if (s.length === 1) {
        return metaLetters.includes(s[0]) ? 0 : 1;
    }
    const sumArray = [], startRecord = {a: [], e: [], i: [], o: [], u: []};

    const addToMetaRecord = (l, idx) => {
        if (startRecord[l]) {
            startRecord[l].push(idx);
            return startRecord[l].length % 2 === 0 ? -1 : startRecord[l][0];
        }
        return -1;
    }
    for (let i = 0; i < s.length; i++) {
        const firstNotEvenMetaIndex = addToMetaRecord(s[i], i);
        if (firstNotEvenMetaIndex < 0) {
            // 不是元音字母，或元音字母为偶数：直接f(n) = f(n-1) + 1
            sumArray[i] = i > 0 ? sumArray[i - 1] + 1 : 1;
        } else {
            // 包含元音字母，元音字母为奇数
            // 两种情况: 
            // 1) 剔除当前元素, Max(f(1), f(2), f(n-1))
            // 2）剔除当前元素
            sumArray[i] = i !== firstNotEvenMetaIndex ? i - firstNotEvenMetaIndex : 1;
        }
        console.log(`i: ${[i]}, s[i]: ${s[i]}, firstNotEvenMetaIndex: ${firstNotEvenMetaIndex}, sumArray[i]: ${sumArray[i]}`) 
    }
    console.log(sumArray)
    return Math.max(...sumArray);
};

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
//
var findTheLongestSubstring = function(s) {
    const record = new Array(5).fill(new Array(5).fill(0));
    const metaLetter = ['a', 'e', 'i', 'o', 'u'];
    // 统计前缀和
    for (let i = 0; i <= s.length; i++) {
        const metaIndex = metaLetter.indexOf(s[i]);
        if (metaIndex >= 0) {
            // 当前为元音
            record[metaIndex][i] = i > 0 ? record[metaIndex][i - 1] + 1 : 1;
        }  else {
            record[metaIndex][i] = i > 0 ? record[metaIndex][i - 1] : 0;
        }
    }

};
// @lc code=end
console.log(findTheLongestSubstring('eleetminicoworoep'))
