import { compileToFunctions } from "./complier/index";
import { mountComponent } from "./lifecycle";
import { initState } from "./state";
import { nextTick } from "./util";


export function initMixin(Vue){
    Vue.prototype._init = function(options) {
        let vm = this;
        vm.$options = options;
        //初始化状态
        initState(vm);

        if(vm.$options.el) {//获取要渲染的模板
            this.$mounted(vm.$options.el)
        }
    }
    Vue.prototype.$nextTick = nextTick
    Vue.prototype.$mounted = function(el) {
        el = document.querySelector(el);
        const vm = this;
        const options = vm.$options;
        vm.$el = el;
        // 获取render
        if(!options.render) {
            let template = options.template;
            if(!template && el) {
                template = el.outerHTML;
            }
            const render = compileToFunctions(template);
            options.render = render
        }

        mountComponent(vm, el);
        
    }
}

