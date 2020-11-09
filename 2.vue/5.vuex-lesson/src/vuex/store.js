import { applyMixin } from "./mixin";
import ModuleCollection from "./module/module-collection";

let Vue;

function installModule(store, path, module, rootState){

    if(path.length > 0 ){
        let parent = path.slice(0, -1).reduce((memo, current) => {
            return memo[current]; // rootState.a
        }, rootState);
        Vue.set(parent, path[path.length - 1], module.state); // 新增不存在的属性需要使用set方法
    }

    module.forEachChildren((childModule, key)=>{
        installModule(store, path.concat(key), childModule, rootState)
    })
    
}
function resetStoreVM(store, state) {
    store._vm = new Vue({
        data: {
            $$state: state
        }
    })
}
export class Store{
    constructor(options) {
        this._modules = new ModuleCollection(options);

        let state = options.state;

        installModule(this, [], this._modules.root, state);

        resetStoreVM(this, state);

    }

    get state() {
        return this._vm._data.$$state
    }

}


export const install = (_Vue) =>{
    Vue = _Vue
    applyMixin(_Vue)
}