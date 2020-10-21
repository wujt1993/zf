import { compileToFunctions } from "./complier/index.js";
import { mountComponent } from "./lifecycle.js";
import { initState } from "./state";

//初始化参数
export function initMixin(Vue){
    Vue.prototype._init = function(options) {
        // vue 可以通过$options 获取配置信息
        let vm = this;
        vm.$options = options;

        //初始化状态
        initState(vm);

        if(vm.$options.el) {
            this.$mounted(vm.$options.el)
        }
    }

    Vue.prototype.$mounted = function(el) {
        el = document.querySelector(el);
        //1、options.render
        //2、options.template
        //3、options.el
        const vm = this;
        const options = vm.$options;
        vm.$options.el = el;
        if(!options.render) {
            let template = options.template
            if(!template && el) {
                template = el.outerHTML
            }
            const render = compileToFunctions(template);
            options.render = render;
        }

        //挂载组件
        mountComponent(vm,el)
    }
}