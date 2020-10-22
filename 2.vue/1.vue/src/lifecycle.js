
import Watcher from './observer/watcher'
import {patch} from './vdom/patch'

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function(vnode) {
        const vm = this;

        //TODO 后期修改
        vm.$options.el = patch(vm.$options.el, vnode);
    }
}


//挂载组件
export function mountComponent(vm, el) {
    // 默认vue是通过watcher来进行渲染  = 渲染watcher （每一个组件都有一个渲染watcher）
    let updateComponent = () => {
        let vnode = vm._render();//生成虚拟节点
        vm._update(vnode); // 将虚拟节点转为真实节点
    }
    new Watcher(vm, updateComponent, () => {}, true); // updateComponent();
}