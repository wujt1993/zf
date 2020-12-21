const {SyncHook} = require("./tapable");
const hook = new SyncHook(['name']);

hook.tap('1', (name)=>{
    console.log(1, name)
});

hook.tap('2', (name)=>{
    console.log(2, name)
});

hook.call("zf");

hook.tap('3', (name)=>{
    console.log(3, name)
});


hook.call("jiagou");
