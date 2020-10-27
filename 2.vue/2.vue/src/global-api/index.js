
import {mergeOptions}  from "../util"

export function initGlobalAPI(Vue) {

    Vue.options = {}

    Vue.mixin = function(mixin) {
        this.options =  mergeOptions(this.options, mixin);
        return this;
    }

    Vue.options._base = Vue;
    Vue.options.components = {}

    Vue.component = function(id, definition) {
        definition.name = definition.name || id;
        definition = this.options._base.extend(definition);
        Vue.options.components[id] = definition;
    }
    let cid = 0
    Vue.extend = function(options) {
        const Super = this;
        const Sub = function VueComponent(options) {
            this._init(options);
        }
        Sub.cid = cid++;
        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.component = Super.component;
        Sub.options = mergeOptions(Super.options, options)
        return Sub;
    }
}