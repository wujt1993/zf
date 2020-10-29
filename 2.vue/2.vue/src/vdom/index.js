import { isObject, isReservedTag } from "../util"

//创建虚拟节点
export function createElement(vm, tag, data={}, ...children){
    if(isReservedTag(tag)){
        return vnode(vm,tag,data, data.key,children, undefined)
    }else {
        const Ctor = vm.$options.components[tag];
        return createComponent(vm,tag,data, data.key,children, undefined, Ctor)
    }
    
}
function createComponent(vm,tag,data, key,children, text, Ctor) {
    if(isObject(Ctor)) {
        Ctor = vm.$options._base.extend(Ctor);
    }
    data.hook = {
        init(vnode) {
            // 调用子组件的构造函数
            let child = vnode.componentInstance = new vnode.componentOptions.Ctor({});
            child.$mounted(); // 手动挂在  vnode.componentInstance.$el = 真实的元素
        }
    }

    return vnode(vm,`vue-compontent-${Ctor.cid}-${tag}`,data, key,undefined, undefined, {Ctor})


}
export function createTextVnode(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text)
}

function vnode(vm, tag, data, key,children, text, componentOptions) {
    return {
        vm, 
        tag,
        data,
        key,
        children,
        text,
        componentOptions
    }
}

export function isSameVnode(oldVnode, newVNode) {
    return (oldVnode.tag === newVNode.tag) && (oldVnode.key === newVNode.key)
}