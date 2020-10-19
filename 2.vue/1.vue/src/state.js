import { observe } from "./observer/index.js";

//初始化状态
export function initState(vm) {
    //将所有配置信息挂载在vm上，以便后续数据视图更新
    const opts = vm.$options;
    
    if(opts.data) { //初始化数据
        initData(vm)
    }
}

function proxy(target, source, key) {
    Object.defineProperty(target, key, {
        get() {
            return target[source][key]
        },
        set(newValue) {
            target[source][key] = newValue;
        }
    })
}

function initData(vm) {
    // 获取 用户数据
    let data = vm.$options.data;

    
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    
    // 数据劫持，将_data 属性上的所有值初始化到vm上
    for(let key in data) {
        proxy(vm, '_data', key)
    }

    //检测数据
    observe(data);
    
}