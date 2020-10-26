
let id = 0;

class Dep{
    constructor() {
        this.id = id++;
        this.subs = []
    }

    depend() {
        Dep.target.addDep(this); //让每个watcher 记住dep
    }

    addSub(watcher) {
        this.subs.push(watcher)
    }

    notify() {
        this.subs.forEach(watcher=>{
            watcher.update()
        })
    }
}

Dep.target = null;

export function pushTarget(watcher) {
    Dep.target = watcher
}

export function popTarget() {
    Dep.target = null;
}


export default Dep;