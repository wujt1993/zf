// 输入一个正整数数组，把数组里所有数字拼接起来排成一个数，
// 打印能拼接出的所有数字中最小的一个。例如输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323。

function PrintMinNumber(numbers)
{
    let len = numbers.length;

    for(let i = 0; i < len - 1; i++) {
        let flag = true
        for(let j = 0; j < len - 1 - i; j++) {
            if((numbers[j] + '' + numbers[j+1]) -  (numbers[j+1] + '' + numbers[j]) > 0) {
                let temp = numbers[j];
                numbers[j] = numbers[j+1];
                numbers[j+1] = temp
                flag = false;
            }
        }
        if(flag) break
    }
    return numbers.join("")
}


console.log(PrintMinNumber([441,44, 402,41]))


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