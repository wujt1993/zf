/**
 * n进制转二进制
 * 整数部分：
 * 101：
 *      1 * 2 ^ 2 = 4
 *      0 * 2 ^ 1 = 0
 *      1 * 2 ^ 0 = 1
 * 101     =>       5
 * 
 * 整数部分：
 * 0.11：
 *      1 * 2 ^ -1 = 0.5
 *      1 * 2 ^ -2 = 0.25
 * 0.11     =>       0.75
 */

let num1 = "101.11"
console.log("二进制转十进制：" + parseInt(num1, 2))
console.log("二进制转十进制：" + nToTen(num1, 2))

function nToTen(num, n) {
    num += "";
    let intNum = num.split(".")[0]
    let floatNum = num.split(".")[1]
    let res = 0;
    for(let i = 0, len = intNum.length; i < len; i++) {
        res += intNum[i] * Math.pow(n, len - 1 - i)
    }
    if(floatNum) {
        for(let i = 0, len = floatNum.length; i < len; i++) {
            res += floatNum[i] * Math.pow(n, -i - 1)
        }
    }
    return res
}


/**
 * 十进制转n进制
 * 整数部分：
 * 10：
 *     10 / 2 = 5 ... 0
 *      5 / 2 = 2 ... 1
 *      2 / 2 = 1 ... 0
 *      1 / 2 = 0 ... 1
 * 10    =>     1010
 * 小数部分：
 * 0.75：
 *      0.75 * 2 = 1.5 ... 1
 *       0.5 * 2 = 1   ... 1
 * 0.75  =>     0.11
 */

let num2 = 1.1

console.log("十进制转二进制：" + num2.toString(2))

Number.prototype.tenToN = function(n){
    let num = this.toString();
    let intNum = num.split(".")[0];
    let floatNum = num.split(".")[1];
    let res = "";
    let count = 52;
    while(intNum != 0) {
        res = intNum % n + res;
        intNum = parseInt(intNum / n);
    }
    if(floatNum) {
        res += ".";
        floatNum = "0." +floatNum; 
        while(floatNum != 0 && count > 1) {
            res = res + parseInt(floatNum * n);
            floatNum = floatNum * n - parseInt(floatNum * n);
            count--
        }
    }
    
    return res
}
console.log("十进制转二进制：" + num2.tenToN(2))