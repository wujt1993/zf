
import {initMixin} from './init.js'

function Vue(options) {

    //初始化vue
    this._init(options);
}

initMixin(Vue); //给原型上添加_init方法，初始化vue

//导出Vue构造函数
export default Vue;