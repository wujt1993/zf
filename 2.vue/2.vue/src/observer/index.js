import { arrayMethods } from "./array";

class Observer{
    constructor(value) {
        Object.defineProperty(value, "__ob__", {
            configurable: false,
            enumerable: false,
            value: this,
        })

        if(Array.isArray(value)) {
            //监听删除、添加、排序、反转元素的方法
            Object.setPrototypeOf(value, arrayMethods)
            this.observeArray(value);
        }else{
            this.walk(value);
        }
        
    }

    observeArray(value) {
        for(let i = 0, len = value.length; i < len; i++) {
            observe(value[i]);
        }
    }

    walk(data) {
        Object.keys(data).forEach(key=>{
            defineReactive(data, key, data[key])
        })
    }
}


function defineReactive(data, key, value) {
    observe(value);
    Object.defineProperty(data, key, {
        get() {
            return value
        },
        set(newValue) {
            if(newValue === value) return;
            value = newValue;
        }
    })
}
export function observe(data) {

    if(typeof data !== 'object' || data === null) {
        return
    }

    return new Observer(data)
}