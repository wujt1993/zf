let Promise = require("./Promise.js")

// let p1 = new Promise((resolve, reject)=>{
//     reject("error")
// }).catch(err=>{
//     console.log("catch:" + err)
// })

//1、当finlly 返回值为普通值时，或返回值为Promise且状态正常时，将不会影响下一个then的返回值
let p2 = new Promise((resolve, reject) => {
    resolve("ok")
}).then(data=>{
    return new Promise((resolve, reject)=>{
        // resolve("p2->ok")
        reject("p2->error")
    })
}).finally(()=>{
    return new Promise((resolve, reject)=>{
        resolve("p2->finally->ok")
    })
}).then(data=>{
    console.log("success:" + data)
},err=>{
    console.log("fail:" + err)
})
//2、当finally异常时,下一个then走reject
let p3 = new Promise((resolve, reject)=>{
    resolve("ok")
}).finally(()=>{
    throw new Error("finally->error")
}).then(data=>{
    console.log("success:" + data)
},err=>{
    console.log("fail:" + err)
})

//3、当finlly 返回值为为Promise且状态reject时，下一个then走reject
let p4 = new Promise((resolve, reject)=>{
    resolve("ok")
}).finally(()=>{
    return new Promise((resolve, reject)=>{
        reject("p4->finally->reject")
    })
}).then(data=>{
    console.log("success:" + data)
},err=>{
    console.log("fail:" + err)
})
