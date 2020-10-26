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

//vue 的生命周期函数
let strats = {}
let LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    //....
]
function mergeHook(parentVal, childVal) {
    if(childVal) {
        if(parentVal) {
            return parentVal.concat(childVal)
        }else {
            return [childVal]
        }
    }else {
        return parentVal
    }
    
}
LIFECYCLE_HOOKS.forEach(hook=>{
    strats[hook] = mergeHook;
})


export function isObject(val) {
    return typeof val === 'object' &&  val !== null;
}


export function mergeOptions(parent, child) {
    let options = {};
    for(let key in parent) {
        mergeField(key);
    }

    for(let key in child) {
        if(parent.hasOwnProperty(key)) continue;
        mergeField(key);
    }

    function mergeField(key) {
        if(strats[key]) {
            return options[key] = strats[key](parent[key], child[key]);
        }
        if(isObject(parent[key])) {
            options[key] = {...parent[key], ...child[key]}
        }else{
            if(child[key]) {
                options[key] = child[key]
            }else {
                options[key] = parent[key]
            }
        }
        
    }

    return options;
}