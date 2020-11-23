import {observe} from './observer/index.js'
import {proxy} from './util/index.js'

export function initState(vm) {
    // vue的数据来源 属性 方法 数据 计算属性 watch
    const opts = vm.$options;

    if(opts.props) {
        initProps(vm)
    }
    if(opts.methods) {
        initMethods(vm)
    }
    if(opts.data) {
        initData(vm)
    }
    if(opts.computed) {
        initComputed(vm)
    }
    if(opts.watch) {
        initWatch(vm)
    }
}

function initProps() {}
function initMethods() {}
function initData(vm) {
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data() : data;

    //将_data上的数据代理给vm，以便用户使用
    for(let key in data) {
        proxy(vm, '_data', key);
    }

    //数据响应式处理(Object.definePrototype)
    observe(data)
}
function initComputed() {}
function initWatch() {}