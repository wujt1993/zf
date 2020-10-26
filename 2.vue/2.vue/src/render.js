import { createElement, createTextVnode } from "./vdom/index"

export function renderMixin(Vue) {
    Vue.prototype._c = function(...args) {
        return createElement(this, ...args);
    }
    Vue.prototype._v = function(text) {
        return createTextVnode(this, text);
    }
    Vue.prototype._s = function(val) {
        return val == null ? "" : typeof val === 'object' ? JSON.stringify(val) : val
    }
    Vue.prototype._render = function() {
        let vm = this;
        let render = vm.$options.render;
        let vnode = render.call(vm);
        return vnode
    }
}