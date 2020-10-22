// 我们可以把当前的watcher 放到一个全局变量上

let id = 0;
class Dep {
    constructor() {
        this.id = id++;
        this.subs = [];//记住watcher
    }

    depend() {
        // 让watcher 记住dep
        Dep.target.addDep(this);  
    }

    addSub(watcher) {
        this.subs.push(watcher)
    }

    notify(){ 
        //通知所有的watcher 执行 ，更新模板
        this.subs.forEach(watcher => watcher.update());
    }
}

Dep.target = null;

export function pushTarget(watcher) {
    Dep.target = watcher;
}

export function popTarget(watcher) {
    Dep.target = null;
}

export default Dep;