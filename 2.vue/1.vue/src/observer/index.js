
import {arrayMethods} from  './array.js'
import Dep from "./Dep"
class Observer{
    constructor(value) {


        //给元素本身也加一个dep，主要用于数组
        this.dep = new Dep();

        //需要对数据进行重新定义

        //将this 值挂载到this.__ob__ 以便外部使用，防止属性被遍历引起是死循环
        Object.defineProperty(value, "__ob__", {
            configurable: false,
            enumerable: false,
            value: this,
        })

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
function dependArray(value) {
    for(let i = 0; i < value.length; i++) {
        let current = value[i];
        current.__ob__ && current.__ob__.dep.depend();
        if(Array.isArray(current)) {
            dependArray(current)
        }
    }
}
export function defineReactive(data, key, value) {
    //如果value 也是个object对象，需要递归检测
    let childOb = observe(value)
    //每个属性都有一个dep
    let dep = new Dep();
    Object.defineProperty(data, key, {
        get() {
            if(Dep.target) {//模板取值的时候才会进行依赖搜集
                // 让这个属性自己的dep记住这个watcher，也要让watcher记住这个dep
                dep.depend();
                if(childOb){
                    childOb.dep.depend();
                    if(Array.isArray(value)) {
                        dependArray(value)
                    }
                }
            }
            return value;
        },
        set(newValue) {
            if(newValue === value) return 
            //如果赋值为object对象,需要检测数据
            observe(newValue)
            value = newValue 
            dep.notify() //通知dep执行watcher更新模板
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