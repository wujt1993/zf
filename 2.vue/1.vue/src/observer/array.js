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

        let ob = this.__ob__;
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;    
                break;
            case 'splice':
                inserted = args.slice(2)
        }
        ob.dep.notify(); 
        // console.log(`调用了数组${method}方法`);
        ob.observeArray(inserted);
        return res
    }
})