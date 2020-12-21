
/**
 * before 优先级高于 stage
 */
const {SyncHook} = require("./tapable");
let hook = new SyncHook(["name"]);
hook.tap({name: "1", stage: 1}, (name)=>{
    console.log(1, '~', name)
})

hook.tap({name: "2", stage: 2}, (name)=>{
    console.log(2, '~', name)
})

hook.tap({name: "3", stage: 4, before: ['1','2']}, (name)=>{
    console.log(3, '~', name)
})

hook.tap({name: "4", stage: 3}, (name)=>{
    console.log(4, '~', name)
})

hook.call("zf");