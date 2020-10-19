let oldArrayProtoMethods = Array.prototype;

export let arrayMethods = Object.create(Array.prototype);

let methods = [
    'push',
    'pop',
    'unshift',
    'shift',
    'splice',
    'reserve',
    'sort'
]


methods.forEach(method=>{
    arrayMethods[method] = function(...args) {
        let res = oldArrayProtoMethods[method].call(this, ...args);
        console.log(`调用了数组${method}方法`);
        return res
    }
})