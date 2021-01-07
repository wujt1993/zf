// 输入一个整数，输出该数32位二进制表示中1的个数。其中负数用补码表示。

function count1(n) {
    let count = 0 
    while(n != 0) {
        count++
        n = n &(n-1)
    }
    return count
}
console.log(count1(31))

/**
 * 当一个数 n 减一时，将会把n最左边index的1转为0 m
 * n = m & n 将会把index 左边变成0， 右边不变
 * (
 *      n = 6 => 0000 0110
 *      m = 5 => 0000 0101
 *      => 
 *      n = n & m => 0000 0100
 *      m = 0000 0011
 *      =>
 *      n = n & m => 0000 0000
 * 
 * )
 * 
 */
