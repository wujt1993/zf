
(() => {
    var modules = ({
        "./src/global.css": (module, exports, require) =>{
            var list = [];
            list.push([
                module.id,
                "body {\r\n    background: #61214f;\r\n}",
                "",
            ])

            var cssWithMappingToString = item => item[1];
            var css = list.map(item=>cssWithMappingToString(item)).join("");
            module.exports = css;
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
    const css = require("./src/global.css");
    console.log(css);
})()