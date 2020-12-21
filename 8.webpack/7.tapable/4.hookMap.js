const {SyncHook,HookMap} = require("./tapable");

let map = new HookMap(()=> new SyncHook(['name']));

map.for("key1").tap('plugin1', (name)=>{console.log(1, name)});
map.for("key2").tap('plugin2', (name)=>{console.log(2, name)});

let hook1 = map.get("key1");
hook1.call("zf")