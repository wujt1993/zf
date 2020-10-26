import Dep, { popTarget, pushTarget } from "./dep";
import { queueWatcher } from "./schedular";

let id = 0;
class Watcher{
    constructor(vm, exprOrFn, cb, options) {
        this.vm = vm;
        this.cb = cb;
        this.options = options;
        this.id = id++;
        this.getter = exprOrFn;
        this.deps = [];
        this.depsId = new Set();
        this.get(); // 调用传入的函数， 调用了render方法， 此时会对模板中的数据进行取值
    }

    get() {
        //当页面渲染时，注册一个watcher
        pushTarget(this);
        this.getter();
        popTarget();
    }

    addDep(dep) {
        let id = dep.id;
        if(!this.depsId.has(id)) {
            this.deps.push(dep);
            this.depsId.add(id);
            dep.addSub(this);
        }
    }

    run() {
        this.get()
    }
    update() {
        queueWatcher(this);
    }
}

export default Watcher;