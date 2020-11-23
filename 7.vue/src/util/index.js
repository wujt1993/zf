
export function isObject(data) {
    return typeof data === 'object' && data !== null;
}

export function proxy(vm,source,key){
    Object.defineProperty(vm, key, {
        get() {
            return data[source][key]
        },
        set(newValue) {
            data[source][key] = newValue
        }
    })
}