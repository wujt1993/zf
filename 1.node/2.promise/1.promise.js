let Promise = require("./Promise.js")
/**
 * 创建Promise时，需要传入一个executor函数
 * excutor  有两个参数 resolve 、 reject
 */
let p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve("ok")
    }, 1000) 
}).then((data) => {
    console.log("succsee:" + data)
    return new Promise((resolve, reject)=>{
        resolve("newP -> ok")
    })
    // return "p2->ok"
}, err => {
    console.log("fail:" + err)
    return "p2->error"
}).then (data => {
    console.log('success:' + data)
},err=>{
    console.log("fail->" + err)
})


let p2 = new Promise((resolve, reject)=>{
    resolve("ok")
}).then().then(data=> {
    console.log(data)
})

function timeout() {
    let dfd = Promise.deffered();
    setTimeout(()=>{
        dfd.resolve("ok")
    },2000)
    return dfd.promise
    
}
timeout().then(data=>{
    console.log(data)
})

