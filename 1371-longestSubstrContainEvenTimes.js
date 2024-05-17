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

/**
 * preCounter[i] 记录读取第i个元素时，0～i分别包含多少个元音字母【a, e, i, o, u】
 * [j, i]区间包含的元音字母个数为偶数的条件表达式为：(preCounter[i] - preCounter[j - 1]) % 2 === 0
 * 暴力解法：二维数组（第一维记录【a, e, i, o, u】， 第二维记录s中第i为包含元音的数量）
 * 每次判断更新满足当前字母的minIndex和maxIndex
 * - 当前i统计为偶数，则0～i满足条件
 * - 当前i统计为奇数，存在统计为奇数的j，则j-1～i满足条件
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
//
var findTheLongestSubstring = function(s) {
    const metaLetter = ['a', 'e', 'i', 'o', 'u'];
    if (s.length === 1) {
        return metaLetters.includes(s[0]) ? 0 : 1;
    }
    const metaCounter = new Array(metaLetter.length).fill(0).map(() => new Array(s.length).fill(0));

    for (let i = 0; i < s.length; i++) {
        let letter = s[i];
        // 统计前缀和
        const metaIndex = metaLetter.indexOf(letter);
        if (metaIndex >= 0) {
            if (i === 0) {
                metaCounter[metaIndex][i] = 1;
            } else {
                metaCounter[metaIndex][i] = metaCounter[metaIndex][i - 1] +  1;
            }
        }
        let times = 0;
        metaCounter.forEach((value) => {
            times += value;
        })
        if (times % 2 === 0) {
            satisfiedIndexes.push(i);
        }
    }
    return satisfiedIndexes[satisfiedIndexes]
};
// @lc code=end
console.log(findTheLongestSubstring('eleetminicoworoep'))
