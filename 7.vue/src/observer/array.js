
let oldArrayMethods = Array.prototype;
export const arrayMethods = Object.create(oldArrayMethods);

let methods = [
    'push',
    'pop',
    'unshift',
    'shift',
    'splice',
    'sort',
    'reserve'
];

methods.forEach(method => {
    arrayMethods[method] = function(...args) {
        const result = oldArrayMethods[method].apply(this, args);
        let ob = this.__ob__;
        let inserted;
        switch (method) {
            case "push":
            case "unshift":
                inserted = args
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
            default:
                break;
        }
        if(inserted) ob.observeArray(inserted)
        return result;
    }
});
