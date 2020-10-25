import { parseHTML } from "./complier/parse";

let callbacks = [];
let waiting = false;

function flushCallbacks(){
    for(let i = 0; i <callbacks.length;i++){
        let callback = callbacks[i];
        callback();
    }
    waiting = false;
    callbacks = [];
}
// 批处理 第一次开定时器 ，后续只更新列表 ，之后执行清空逻辑

// 1.第一次cb渲染watcher更新操作  （渲染watcher执行的过程肯定是同步的）
// 2.第二次cb 用户传入的回调
export function nextTick(cb){
    callbacks.push(cb); // 默认的cb 是渲染逻辑 用户的逻辑放到渲染逻辑之后即可
    if(!waiting){
        waiting = true;
        // 1.promise先看支持不支持 
        // 2.mutationObserver
        // 3.setImmdiate
        // 4.setTimeout  Vue3 next-tick就直接用了promise
        Promise.resolve().then(flushCallbacks); // 多次调用nextTick 只会开启一个promise
    }
}


export function isObject(item){
    return typeof item === 'object' && item !== null
}

const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted'
]

const strats = {};

function mergeHook(parentVal, childVal) {
    if(childVal) {
        if(parentVal) {
            return parentVal.concat(childVal)
        }else{
            return [childVal]
        }
    }else {
        return [parentVal]
    }
}


LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
})

export function mergeOptions(parent, child) {
    //1、自定义策略
    //2、父级元素有子元素没，则用父级元素
    //3、子元素有，则用子元素
    let options = {};
    for(let key in parent) {
        mergeFiled(key)
    }

    for(let key in child) {
        if(!parent[key]) mergeFiled(key)
    }

    function mergeFiled(key) {
        if(strats[key]) {
            options[key] = mergeHook(parent[key], child[key])
            return  
        }
        if(isObject(parent[key]) && isObject(child[key])) {
            options[key] = {...parent[key], ...child[key]}
        }else {
            if(child[key]) {
                options[key] = child[key]
            }else{
                options[key] = parent[key]
            }
        }
    }

    return options;
}