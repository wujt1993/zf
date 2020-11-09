import { applyMixin } from "./mixin";

let Vue;

const forEachVal = (obj, cb) => {
    Object.keys(obj).forEach(key => cb(obj[key], key))
}

export class Store{
    constructor(options) {
        this.getters = {}
        let computed = {}
        forEachVal(options.getters,(value, key)=>{
            computed[key] = () => {
                return value.call(this, this.state)
            }
        
            Object.defineProperty(this.getters, key, {
                get: ()=> {
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
        forEachVal(options.mutations, (fn, key)=>{
            this.mutations[key] = (payload) => {
                fn.call(this, this.state, payload)
            }
        })
        forEachVal(options.actions, (fn, key)=>{
            this.actions[key] = (payload) => {
                fn.call(this, this, payload)
            }
        })
    }

    get state() {
        return this._vm._data.$$store
    }

    commit = (type, payload) =>{
        this.mutations[type](payload)
    }

    dispatch = (type, payload) =>{
        this.actions[type](payload)
    }
}


export const install = (_Vue) =>{
    Vue = _Vue
    applyMixin(_Vue)
}