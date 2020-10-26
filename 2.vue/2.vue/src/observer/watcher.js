
let id = 0;
class Watcher{
    constructor(vm, exprOrFn, cb, options) {
        this.vm = vm;
        this.cb = cb;
        this.options = options;
        exprOrFn();
    }
}

export default Watcher;