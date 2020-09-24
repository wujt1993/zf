let Promise = require("./Promise.js")

let p1 = new Promise((resolve, reject) => {
    resolve("ok")
})
//1、参数为promise 时返回该参数
let p2 = Promise.resolve(p1);
console.log(p1 === p2)

//2、参数为thenable对象时,会执行then,并返回一个promise
let p3 = {
    then: function(resolve, reject) {
        console.log("p3")
        reject(42);
    }
}
Promise.resolve(p3).then(data=>{
    console.log('success:' +data)
},err=>{
    console.log('err:' +err)
})
/**
 * 3、参数为普通值 相当于 new Promise((resolve, reject) => {
 *  resolve("ok")
 * })
 */


Promise.resolve("ok").then(data=>{
    console.log('success:' +data)
},err=>{
    console.log('err:' +err)
}) 