// const {SyncHook} = require("tapable");

class SyncHook {
    constructor(args) {
        this.args = args || [];
        this.taps = [];
    }
    tap(name, fn) {
        this.taps.push(fn);
    }

    call() {
        let args = Array.prototype.slice.call(arguments, 0 ,this.args.length);
        this.taps.forEach(tap=>tap(...args))
    }
}
const hook = new SyncHook(["name", "age"]);
hook.tap("这是个没什么作用的参数",(name, age)=>{
    console.log(`hello ${name} : ${age}`)
})
hook.call("hook", 12)