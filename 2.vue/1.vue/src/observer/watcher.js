import { popTarget, pushTarget } from "./Dep";
import { queueWatcher } from "./schedular";

let id = 0;
class Watcher {
    constructor(vm,exprOrFn,cb,options){
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
        //每一次组件渲染都会调用此方法
        pushTarget(this);
        this.getter();
        popTarget();
    }

    addDep(dep) {
        //当页面调用属性时，则会调用该方法，所以需要去重
        let id = dep.id;
        if (!this.depsId.has(id)) { // dep 是非重复的，watcher肯定也不会重
            this.depsId.add(id);
            this.deps.push(dep);
            dep.addSub(this);//dep也需要记录watcher
        }
    }
    run() {
        this.getter()
    }
    update() {// 如果多次更改 我希望合并成一次  （防抖）
        // this.get(); // 不停的重新渲染
        queueWatcher(this)
    }
}
export default Watcher;