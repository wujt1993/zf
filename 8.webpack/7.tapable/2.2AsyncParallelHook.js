const {AsyncParallelHook} = require("./tapable");

const hook = new AsyncParallelHook(["name"]);

console.time("cost");

hook.tapPromise("1", (name) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log(1, name);
            resolve();
        }, 1000)
    })
})

hook.tapPromise("2", (name) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log(2, name);
            resolve();
        }, 2000)
    })
})

hook.promise("zhufeng").then(res=>{
    console.log(res)
    console.timeEnd("cost")
})
