(() => {
    var modules = ({
        "./src/index.js": ((modules, exports, require) => {
            require.r(exports);
            var _title_js__WEBPACK_IMPORTED_MODULE_0__ = require("./src/title.js");
            console.log(_title_js__WEBPACK_IMPORTED_MODULE_0__.default);
            console.log(_title_js__WEBPACK_IMPORTED_MODULE_0__.age);
        }),
        "./src/title.js": ((modules, exports, require) => {
            require.r(exports);
            require.d(exports, {
                "default": () => __WEBPACK_DEFAULT_EXPORT__,
                "age": () => age
            });
            const __WEBPACK_DEFAULT_EXPORT__ = ('title_name');
            const age = 'title_age'
        })
    })
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
        require.r = (exports) => {
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            }
            Object.defineProperty(exports, '__esModule', { value: true });
        };
    })();
    require("./src/index.js");
})()