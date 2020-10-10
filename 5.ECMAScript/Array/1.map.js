
// var new_array = arr.map(function callback(currentValue[, index[, array]]) {
// }[, thisArg])
/**
 * 1、thisArg会作为this 在callback中使用
 * 2、返回新的数组
 */
const array1 = [1, 4, 9, 16];
const map1 = array1.map(function(current, index, arr){
    return this * current
}, 2);
console.log(map1);


/**
 * [1,2,3].map(parseInt) => 
 * [1,2,3].map(function(current, index, arr){
 *      return parseInt(current, index, arr) =>
 *      return parseInt(current, index)
 *      
 * })
 */
let map2 = [1,2,3].map(parseInt)
console.log(map2)

let map3 = [1,2,3].map(function(current, index) {
    return parseInt(current, index)
})
console.log(map3)
