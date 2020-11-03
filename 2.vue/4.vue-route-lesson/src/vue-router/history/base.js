
export function createRoute(record, location) {
    let res = [];
    if(record) {
        while(record) {
            res.unshift(record);
            record = record.parent;
        }
    }
    return {
        ...location,
        matched: res,
    }
}
function runQueue(queue, iterator, cb) {
    const next = (index)=>{
        if(index >= queue.length) {
            return cb()
        }
        let hook = queue[index];
        iterator(hook, ()=>{
            next(index+1)
        })
    }

    next(0)
}
export default class History {
    constructor(router) {
        this.router = router

        // 最终核心 需要将current属性变化成响应式的 后续current变化会更新视图 
        this.current = createRoute(null, {
            path: "/"
        })

    }

    transitionTo(location, onComplete) {
        let route = this.router.match(location);

        let queue = [].concat(this.router.beforeEachHooks);
        const iterator = (hook, cb)=> {
            hook(route, this.current, cb)
        }
        runQueue(queue, iterator, ()=>{

            this.current = route;
            onComplete && onComplete();
            this.cb && this.cb(route)
        })

        
    }

    listen(cb) {
        this.cb = cb
    }

    
}