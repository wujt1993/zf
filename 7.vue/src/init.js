import { compilerToFunctions } from './compiler/index.js';
import {initState} from './state'
export function initMixin(Vue) {

    Vue.prototype._init = function(options) {
        const vm = this;
        vm.$options = options;//将配置信息挂载子Vue实例的$options 上
        //初始化状态
        initState(vm);

        //页面挂载
        if(vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }

    Vue.prototype.$mount = function(el) {
        const vm = this;
        const options = vm.$options;
        el = document.querySelector(el);
        if(!options.render) {
            let template = options.template;
            
            if(!template && el) {
                template = el.outerHTML;
            }
            //将template 转成render
            const render = compilerToFunctions(template)
        }
    }
}