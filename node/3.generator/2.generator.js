
const fs = require("fs").promises
const { resolve } = require("path")
const path = require("path")

function co(it) {
    return new Promise((resolve, reject)=>{
        function step(data) {
            let {value, done} = it.next(data);
            if(done) {
                resolve(value)
            }else {
                value.then(data=>{
                    step(data)
                })
            }
        }

        step()
    })
}


function * gen() {
    let name = yield fs.readFile(path.resolve(__dirname,"name.txt"), 'utf-8') 
    let age = yield fs.readFile(path.resolve(__dirname,name), 'utf-8') 
    return age
}
co(gen()).then(data=>{
    console.log(data)
})
// let it = gen();
// it.next().value.then(data=>{
//     it.next(data).value.then((data)=>{
//         console.log(it.next(data).value)
//     })
// })