let Promise = require("./Promise.js")
let p1 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        if(Math.random() > 0.5) {
            resolve("p1->ok")
        }else{
            reject("p1->err")
        }
    },Math.random() * 100)
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        if(Math.random() > 0.5) {
            resolve("p2->ok")
        }else{
            reject("p2->err")
        }
    },Math.random() * 100)
})

Promise.race([p1, p2]).then(data=>{
    console.log(data)
}, err=>{
    console.log(err)
})