const sum = new Function("a","b","return (a + b)");
console.log(sum(1,2))

console.log("===================================================")

function a (a) {

}
//1、Function.name 返回函数名称
console.log("name:"+a.name);

//2、Function.length 返回函数的传参个数
console.log("length:"+a.length)

console.log("===================================================")



var x = 10;
function createFunction1() {
    var x = 20;
    return new Function('return x;'); // 这里的 x 指向最上面全局作用域内的 x
}
function createFunction2() {
    var x = 20;
    function f() {
        return x; // 这里的 x 指向上方本地作用域内的 x
    }
    return f;
}
var f1 = createFunction1();
console.log(f1());          // 10
var f2 = createFunction2();
console.log(f2());          // 20