const {AsyncParallelHook} = require("./tapable");

const hook = new AsyncParallelHook(["name"]);

console.time("cost");

hook.tapAsync("1", (name, callback) => {
    console.log("1========================================================");
    setTimeout(()=>{
        console.log(1, name);
        callback();
    }, 2000)
    
})

hook.tapAsync("2", (name, callback) => {
    console.log("2========================================================");
    setTimeout(()=>{
        console.log(2, name);
        callback();
    }, 1000)
})


hook.callAsync("zf", (err)=>{
    console.timeEnd("cost")
})
