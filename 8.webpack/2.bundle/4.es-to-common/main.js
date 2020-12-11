(() => {
    var modules = {
        "./src/index.js": ((module, exports, require) => {
            "use strict";
            require.r(exports);
            var _title_js__WEBPACK_IMPORTED_MODULE_0__ = require("./src/title.js");
            var _title_js__WEBPACK_IMPORTED_MODULE_0___default = require.n(_title_js__WEBPACK_IMPORTED_MODULE_0__);
            console.log((_title_js__WEBPACK_IMPORTED_MODULE_0___default()));
        }),
        "./src/title.js": ((module) => {
            module.exports = {
                name: 'title_name',
                age: 'title_age'
            }
        })
    }

    var cache = {};
    function require(moduleId) {
        if (cache[moduleId]) {
            return cache[moduleId].exports;
        }
        var module = cache[moduleId] = {
            exports: {}
        };
        modules[moduleId](module, module.exports, require);
        return module.exports;
    }
    (() => {
        require.d = (exports, definition) => {
            for (var key in definition) {
                if (require.o(definition, key) && !require.o(exports, key)) {
                    Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                }
            }
        };
    })();
    (() => {
        require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
    })();
    (() => {
        require.n = (module) => {
            var getter = module && module.__esModule ?
                () => module['default'] :
                () => module;
            require.d(getter, { a: getter });
            return getter;
        };
    })();
    (() => {
        require.r = (exports) => {
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            }
            Object.defineProperty(exports, '__esModule', { value: true });
        };
    })();
    require("./src/index.js");
})()