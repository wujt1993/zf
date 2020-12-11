
    (() => {
     var modules = {
       
           "./src/name.js": (module,exports,require) => {
             module.exports = "webpack"; //2//1
           },
           "./src/title.js": (module,exports,require) => {
             const name = require("./src/name.js");

module.exports = "hello " + name; //2//1
           }
     };
     var cache = {};
     function require(moduleId) {
       if (cache[moduleId]) {
         return cache[moduleId].exports;
       }
       var module = (cache[moduleId] = {
         exports: {},
       });
       modules[moduleId](module, module.exports, require);
       return module.exports;
     }
     (() => {
      const title = require("./src/title.js");

console.log(title); //2//1
     })();
   })();
    