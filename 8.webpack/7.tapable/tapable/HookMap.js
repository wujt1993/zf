const { Hook } = require("tapable");

class HookMap{

    constructor(factory) {
        this._map = new Map();
        this._factory = factory;
    }

    get(key) {
        return this._map.get(key)
    }

    for(key) {
        if(!this.get(key)) {
            let newHook = this._factory();
            this._map.set(key, newHook);
        }
        return this.get(key)
    }

    tap(key, options, fn) {
        this.for(key).tap(options, fn)
    }

}

module.exports = HookMap;