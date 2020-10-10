const fs = require("fs")
/**
 * 每一个宏任务中
 * nextTick 微任务最先执行
 * 
 * 同个时间段
 * 宏任务的执行顺序
 * timers（定时器）->  pending callbacks (待定回调、一般不使用) ->  idle, prepare(系统内部) -》 poll (轮询，检索新的 I/O 事件,如果队列过多则会返回重新执行timers) 
 * -> check(setImmediate() 回调函数在这里执行) ->close callbacks(关闭的回调函数)
 * 
 * 
 */

console.log("1")

new Promise((resolve, reject)=>{
    resolve("promise")
}).then(data=>{
    console.log(data)
})

//最先执行的微任务
process.nextTick(function(){
    console.log("nextTick")
})

/**
 * 由于只有执行时间到了，才会把宏任务入队，因此，setTimeout、setImmediate、readFile的执行顺序是不确定
 */
setTimeout(()=>{
    console.log("setTimeout")
})

setImmediate(() => {
    console.log("setImmediate")
})

fs.readFile("1.procsss.js", "utf-8", function(err, data) {
    console.log("readFile")
})



setTimeout(() => {
    setTimeout(()=>{
        console.log("setTimeout")
    })
    
    setImmediate(() => {
        console.log("setImmediate")//先执行
    })
}, 0);