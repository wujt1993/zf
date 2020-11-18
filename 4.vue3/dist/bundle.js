(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueReactivity = {}));
}(this, (function (exports) { 'use strict';

    var effect = function (fn, options) {
        var effect = createReactiveEffect(fn);
        effect();
    };
    var effectStack = [];
    function createReactiveEffect(fn) {
        var effect = function reactiveEffect() {
            effectStack.push(effect);
            fn();
        };
        return effect;
    }

    var mutableHandlers = {
        get: function (target, key, receiver) {
            return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver) {
            var res = Reflect.set(target, key, value, receiver);
            console.log(effectStack, '--------------------');
            effectStack.forEach(function (effect) { return effect(); });
            return res;
        }
    };

    var isObject = function (val) { return typeof val == 'object' && val !== null; };

    var reactive = function (target) {
        return createReactiveObject(target, mutableHandlers);
    };
    var reactiveMap = new WeakMap();
    function createReactiveObject(target, baseHandler) {
        if (!isObject(target))
            return target;
        var existProxy = reactiveMap.get(target);
        if (existProxy) {
            return existProxy;
        }
        var proxy = new Proxy(target, baseHandler);
        reactiveMap.set(target, proxy);
        return proxy;
    }

    exports.effect = effect;
    exports.reactive = reactive;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bundle.js.map
