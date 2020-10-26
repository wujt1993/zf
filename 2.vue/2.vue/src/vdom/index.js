//创建虚拟节点
export function createElement(vm, tag, data={}, ...children){
    return vnode(vm,tag,data, data.key,children, undefined)
}

export function createTextVnode(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text)
}


function vnode(vm, tag, data, key,children, text) {
    return {
        vm, 
        tag,
        data,
        key,
        children,
        text
    }
}