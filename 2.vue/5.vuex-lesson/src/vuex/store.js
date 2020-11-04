import { applyMixin } from "./mixin";
import ModuleCollection from "./module/module-collection";
import { forEachVal } from "./util";

let Vue;
export class Store {
    constructor(options) {
        this._module = new ModuleCollection(options)
        console.log(this._module)
    }

    get state() {
        return this._vm._data.$$store
    }

    commit = (type, payload) => {
        this.mutations[type](payload)
    }

    dispatch = (type, payload) => {
        this.actions[type](payload)
    }
}

export const install = (_Vue) => {
    Vue = _Vue;
    applyMixin(_Vue);
}