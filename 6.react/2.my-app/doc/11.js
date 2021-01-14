// 输入一个正整数数组，把数组里所有数字拼接起来排成一个数，
// 打印能拼接出的所有数字中最小的一个。例如输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323。

function PrintMinNumber(numbers)
{
    let arr = [];
    allSort(0, numbers, arr)
}

function allSort(pos, numbers, arr) {

    
}
console.log(PrintMinNumber([1,234,5]))


/**
 * 1    234  5
 * 1    5    234
 * 234  1    5
 * 234  5    1
 * 5    1    234
 * 5    234  1 
 */

/**
 * 1 2 3 4
 * n!
 * 
 */