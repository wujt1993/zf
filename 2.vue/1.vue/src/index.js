import { initMixin } from "./init";
import { renderMixin } from "./render";
import {lifecycleMixin} from './lifecycle'
function Vue(options) {
    this._init(options)
    
}

initMixin(Vue);
lifecycleMixin(Vue);//将虚拟节点转换为真实节点
renderMixin(Vue);//创建虚拟节点
export default Vue;