import { observe } from "./observer/index";

export function initState(vm) {
    const opts = vm.$options;
    if(opts.data) {
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
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data() : data;

    for(let key in data) {
        //将data上的数据挂载到vm上
        proxy(vm, '_data', key);
    }
    observe(data);
}

