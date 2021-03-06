
(() => {
    var modules = ({
        "css-loader.js!./src/global.css": (module, exports, require) => {
            var api = require("./api.js");
            var cssWithMappingToString = item => item[1];
            var css = api(cssWithMappingToString);
            css.push([module.id, "body {\r\n    background: #61214f;\r\n}", ""]);
            module.exports = css;
        },
        "css-loader.js!./src/index.css": (module, exports, require) => {
            var api = require("./api.js");
            var cssWithMappingToString = item => item[1];
            var css = api(cssWithMappingToString);
            var GLOBAL = require("css-loader.js!./src/global.css");
            css.i(GLOBAL);
            css.push([
                module.id,
                "body {\r\n    background: #61214f;\r\n}",
                "",
            ])
            module.exports = css;
        },
        './api.js': (module, exports, require) => {
            module.exports = function (cssWithMappingToString) {
                var list = [];
                list.toString = function toString() {
                    return this.map(function (item) {
                        var content = cssWithMappingToString(item);
                        return content;
                    }).join('');
                };
                list.i = function (otherList) {
                    list.unshift(...otherList);
                }
                return list;
            }
        },
        "./src/index.css": (module, exports, require) => {
            var result = require("css-loader.js!./src/index.css");
            module.exports = result.toString()
        }
    })
    var cache = {};
    function require(moduleId) {
        if (cache[moduleId]) {
            return cache[moduleId].exports;
        }
        var module = cache[moduleId] = {
            id: moduleId,
            exports: {}
        };
        modules[moduleId](module, module.exports, require);
        return module.exports;
    }
    const css = require("./src/index.css");
    console.log(css);
})()