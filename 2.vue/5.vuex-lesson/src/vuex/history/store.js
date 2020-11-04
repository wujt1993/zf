import { applyMixin } from "./mixin";
import { forEachVal } from "./util";

let Vue;
export class Store {
    constructor(options) {
        this.getters = {};
        let computed = {};
        forEachVal(options.getters, (value, key) => {
            computed[key] = () => value.call(this, this.state)
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return this._vm[key]
                }
            })
        })

        this._vm = new Vue({
            data: {
                $$store: options.state
            },
            computed
        })

        this.mutations = {};
        this.actions = {};
        forEachVal(options.mutations, (fn, key) => {
            this.mutations[key] = (payload)=> fn.call(this, this.state, payload)
        })

        forEachVal(options.actions, (fn, key) => {
            this.actions[key] = (payload)=> fn.call(this, this, payload)
        })
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