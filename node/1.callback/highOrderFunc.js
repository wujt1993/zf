/**
 * 高阶函数的特点：
 * 1）传入一个函数
 * 2）返回一个函数
 */

function say(a,b,c) {
    console.log("hello callback ~",a,b,c);
}

Function.prototype.before = function(callback) {
    return (...args) => {
        callback()
        this(...args)
    }
}


let beforSay = say.before(function() {
    console.log("hello before ~")
})

beforSay(1,2,3)