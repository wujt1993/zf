// 题目描述
// 在一个长度为n的数组里的所有数字都在0到n-1的范围内。 数组中某些数字是重复的，但不知道有几个数字是重复的。
// 也不知道每个数字重复几次。请找出数组中第一个重复的数字。 例如，如果输入长度为7的数组{2,3,1,0,2,5,3}，那么对应的输出是第一个重复的数字2。
// 返回描述：
// 如果数组中有重复的数字，函数返回true，否则返回false。
// 如果数组中有重复的数字，把重复的数字放到参数duplication[0]中。（ps:duplication已经初始化，可以直接赋值使用。）
let duplication = []
function duplicate(numbers, duplication)
{
    // write code here
    //这里要特别注意~找到任意重复的一个值并赋值到duplication[0]
    //函数返回True/False
    let map = {};
    for(let i = 0; i < numbers.length; i++) {
        let number = numbers[i]
        if(map[number]) {
            duplication[0] = number 
            return true
        }else {
            map[number] = true
        }
    }
    return false
}

// 设置一个指针i指向开头0，
// 对于arr[i]进行判断，如果arr[i] == i， 说明下标为i的数据正确的放在了该位置上，让i++
// 如果arr[i] != i, 说明没有正确放在位置上，那么我们就把arr[i]放在正确的位置上，也就是交换
// arr[i] 和arr[arr[i]]。交换之后，如果arr[i] ！= i, 继续交换。
// 如果交换的过程中，arr[i] == arr[arr[i]]，说明遇到了重复值，返回即可。

console.log(duplicate([6,3,2,0,2,5,0], duplication))


