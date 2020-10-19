
import {arrayMethods} from  './array.js'

class Observer{
    constructor(value) {
        //需要对数据进行重新定义
        //当value为数组时，并不对每个元素进行defineProperty
        //当数组长度发生变化时，监听数组数据：push、pop、unshift、shift、splice、reserve、 sort
        if(Array.isArray(value)) {
            Object.setPrototypeOf(value,arrayMethods);
            this.observeArray(value); 
        }else{
            this.walk(value)
        }
        
    }

    observeArray(value) {
        for(let i = 0, length = value.length; i < length; i++) {
            observe(value[i])
        }
    }
    walk(data) {
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key])
        });
    }
}

export function defineReactive(data, key, value) {
    //如果value 也是个object对象，需要递归检测
    observe(value)


    Object.defineProperty(data, key, {
        get() {
            return value;
        },
        set(newValue) {
            if(newValue === value) return 
            //如果赋值为object对象,需要检测数据
            observe(newValue)
            value = newValue 
        }
    })
}

//检测数据
export function observe(data){
    //只能对对象类型进行观测
    if(typeof data !== 'object' || data === null) {
        return 
    }
    //通过类对数据进行观测
    return new Observer(data)
}