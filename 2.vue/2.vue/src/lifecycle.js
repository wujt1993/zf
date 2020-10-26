import Watcher from "./observer/watcher"
import {patch} from './vdom/patch'

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function(vnode) {
        const vm = this;
        vm.$el = patch(vm.$el, vnode);
    }
}

//组件挂载
export function mountComponent(vm, el) {
     // 默认vue是通过watcher来进行渲染  = 渲染watcher （每一个组件都有一个渲染watcher）
    let updateComponent = () => {
        let vnode = vm._render();//生成虚拟节点
        vm._update(vnode);//将虚拟节点转为真实节点
    }

    new Watcher(vm, updateComponent, () => {}, true); // updateComponent();

}