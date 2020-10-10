let Promise = require("./Promise.js")
let p1 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        if(Math.random() > 0.5) {
            resolve("p1->ok")
        }else{
            reject("p1->err")
        }
    },200)
})

let p2 = new Promise((resolve, reject) => {
    resolve("p2->ok")
})

Promise.all([p1, 2, p2]).then(data=>{
    console.log(data)
}, err=>{
    console.log(err)
})