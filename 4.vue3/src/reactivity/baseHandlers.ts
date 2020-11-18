import {effectStack} from "./effect"
export const mutableHandlers = {
    get(target, key, receiver) {
        return Reflect.get(target,key,receiver)
    },
    set(target, key, value, receiver) {
        
        let res = Reflect.set(target, key, value, receiver);
        console.log(effectStack , '--------------------')
        effectStack.forEach(effect=>effect());
        return res;
    }
}