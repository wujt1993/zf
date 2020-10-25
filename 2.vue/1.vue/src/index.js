import { initMixin } from "./init";
import { renderMixin } from "./render";
import {lifecycleMixin} from './lifecycle'
import { initGlobalAPI } from "./global-api/index";
function Vue(options) {
    this._init(options)
    
}

initMixin(Vue);
lifecycleMixin(Vue);//将虚拟节点转换为真实节点
renderMixin(Vue);//创建虚拟节点

initGlobalAPI(Vue)

export default Vue;