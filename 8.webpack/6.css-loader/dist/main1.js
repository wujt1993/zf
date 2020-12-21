
(() => {
    var modules = ({
        "./src/global.css": (module, exports, require) =>{
            module.exports =  "body {\r\n    background: #61214f;\r\n}"; 
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