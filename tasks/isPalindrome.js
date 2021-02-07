// https://rubaxa.github.io/playground/#is-palindrome

/**
 * Является ли строка палиндромом
 * @param  {string}  value
 * @return {boolean}
 */
function isPalindrome(value) {
    value = value.replace(/\s+/g, '').toLowerCase();
    return value === value.split('').reverse().join('');
    
    // Можно представить в виде цикла
    // const valLen = value.length;
    
    // for (let i = 0; i < valLen / 2; i++) {
    //     if (value[i] !== value[valLen - i - 1]) {
    //         return false;
    //     }
    // }
    
    // return true;
}

console.log(isPalindrome('abcd')); // false
console.log(isPalindrome('A man a plan a canal Panama'));// true
