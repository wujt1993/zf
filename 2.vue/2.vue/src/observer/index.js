import { arrayMethods } from "./array";
import Dep from "./dep";

class Observer{
    constructor(value) {
        Object.defineProperty(value, "__ob__", {
            configurable: false,
            enumerable: false,
            value: this,
        })
        this.dep = new Dep(); // 给数组本身和对象本身增加一个dep属性
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
function dependArray(value){ // 就是让里层数组收集外层数组的依赖，这样修改里层数组也可以更新视图 
    for(let i = 0 ; i < value.length;i++){
        let current = value[i];
        current.__ob__ && current.__ob__.dep.depend(); // 让里层的和外层收集的都是同一个watcher
        if(Array.isArray(current)){
            dependArray(current);
        }
    }
}

function defineReactive(data, key, value) {
    let childOb = observe(value);
    let dep = new Dep(); // 每次都会给属性创建一个dep
    Object.defineProperty(data, key, {
        get() {
            if(Dep.target){
                dep.depend();// 让这个属性自己的dep记住这个watcher，也要让watcher记住这个dep
                if(childOb){ // 如果对数组取值 会将当前的watcher和数组进行关联
                    childOb.dep.depend();
                    if(Array.isArray(value)){
                        dependArray(value);
                    }
                }
                
            }
            return value
        },
        set(newValue) {
            if(newValue === value) return;
            value = newValue;
            observe(newValue);
            dep.notify();// 通知dep中记录的watcher让它去执行
        }
    })
}
export function observe(data) {

    if(typeof data !== 'object' || data === null) {
        return
    }
    if(data.__ob__){ // 放置循环引用了
        return;
    }
    return new Observer(data)
}