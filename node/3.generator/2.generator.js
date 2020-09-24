const { rejects } = require("assert");
const { resolve } = require("path");
const { isRegExp } = require("util");

const fs = require("fs").promises

function co(it) {
    return new Promise((resolve, reject)=>{
        function step(data) {
            let {value, done} = it.next(data)
            if(done) {
                resolve(value)
            }else{
                Promise.resolve(value).then(data=>{
                    step(data)
                }, reject)
            }
        }
        step()
        
    })
}


function *gen() {
    let name = yield fs.readFile("./generator/name.txt", "utf-8");
    let age = yield fs.readFile("./generator/"+name, "utf-8")
    return age;
}
co(gen()).then((data) =>{
    console.log(data)
})

// let it = gen();
// it.next().value.then((data) =>{
//     it.next(data).value.then((data) =>{
//         console.log(it.next(data).value)
//     })
// })