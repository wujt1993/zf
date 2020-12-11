(()=>{
    var modules = {
        './src/title.js': ((module) =>{
            module.exports = {
                name: 'title_name',
                age: 'title_age'
            }
        }) 
    }
    const cache = {}
    function require(moduleId) {
        if(cache[moduleId]) {
            return cache[moduleId].exports;
        }

        var module = cache[moduleId] = {
            exports: {}
        }
        modules[moduleId](module, module.exports, require);
        return module.exports
    }
    (()=>{
        let title = require("./src/title.js");
        console.log(title)
    })()
})()