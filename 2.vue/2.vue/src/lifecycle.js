import Watcher from "./observer/watcher"
import { patch } from './vdom/patch'

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this;
        // 第一次初始化 第二次走diff算法
        const prevVnode = vm._vnode; // 先取上一次的vnode 看一下是否有
        vm._vnode = vnode // 保存上一次的虚拟节点
        if (!prevVnode) {
            vm.$el = patch(vm.$el, vnode); // 组件调用patch方法会产生$el属性
        } else {
            vm.$el = patch(prevVnode, vnode);
        }
    }
}

export function callHook(vm, hook) {
    let handlers = vm.$options[hook];
    if (handlers) {
        handlers.forEach(handler => {
            handler.call(vm)
        })
    }

}

//组件挂载
export function mountComponent(vm) {
    // 默认vue是通过watcher来进行渲染  = 渲染watcher （每一个组件都有一个渲染watcher）
    let updateComponent = () => {
        let vnode = vm._render();//生成虚拟节点

        vm._update(vnode);//将虚拟节点转为真实节点
    }

    new Watcher(vm, updateComponent, () => { }, true); // updateComponent();

}