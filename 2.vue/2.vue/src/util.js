let callbacks = [];
let waiting = false;

function flushCallbacks() {
    for(let i = 0; i <callbacks.length;i++){
        let callback = callbacks[i];
        callback();
    }
    waiting = false;
    callbacks = [];
}

export function nextTick(cb) {
    callbacks.push(cb);
    if(!waiting) {
        waiting = true;
         // 1.promise先看支持不支持 
        // 2.mutationObserver
        // 3.setImmdiate
        // 4.setTimeout  Vue3 next-tick就直接用了promise
        return Promise.resolve().then(flushCallbacks)
    }
    
}