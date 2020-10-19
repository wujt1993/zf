import { initState } from "./state";

//初始化参数
export function initMixin(Vue){
    Vue.prototype._init = function(options) {
        // vue 可以通过$options 获取配置信息
        let vm = this;
        vm.$options = options;

        //初始化状态
        initState(vm);

    }
}