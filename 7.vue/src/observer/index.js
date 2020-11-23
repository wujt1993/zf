import { isObject } from "../util/index.js";
import {arrayMethods} from "./array.js"

class Observer {
    constructor(value) {
        //添加__ob__属性，用于对象挂载本身，且不能被枚举遍历
        Object.defineProperty(value, '__ob__', {
            enumerable: false,
            configurable: false,
            value: this
        })
        if(Array.isArray(value)) {
            value.__proto__ = arrayMethods;//对改变数组长度及改变数组排序的方法进行劫持
            this.observeArray(value);//对每个元素进行数据劫持
        }else{
            this.walk(value);//对象 
        }
    }

    observeArray(data) {
        data.forEach(item => {
            observe(item);
        })
    }

    walk(data) {
        let keys = Object.keys(data)
        keys.forEach( key=> {
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
            if(value == newValue);
            observe(newValue);
            value = newValue;
            
        }
    })
}

export function observe(data) {
    if(!isObject(data)) return; 
    new Observer(data);
}