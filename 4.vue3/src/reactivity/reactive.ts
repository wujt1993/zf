import {mutableHandlers} from './baseHandlers';
import {isObject} from '../shared/index'
export const reactive = (target:object) =>{
    return createReactiveObject(target, mutableHandlers);
}

const reactiveMap = new WeakMap();
function createReactiveObject(target, baseHandler) {
    if(!isObject(target)) return target;
    let existProxy = reactiveMap.get(target)
    if(existProxy) {
        return existProxy
    }

    let proxy = new Proxy(target, baseHandler)
    reactiveMap.set(target, proxy);
    return proxy
}