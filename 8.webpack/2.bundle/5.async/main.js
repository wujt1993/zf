(() => {
    var modules = {};
    var cache = {};
    function require(moduleId) {
        if(cache[moduleId]){//先看缓存里有没有已经缓存的模块对象
            return cache[moduleId].exports;//如果有就直接返回
          }
          //module.exports默认值 就是一个空对象
          var module = {exports:{}};
          cache[moduleId]= module;
          //会在模块的代码执行时候给module.exports赋值
          modules[moduleId].call(module.exports,module,module.exports,require);
          return module.exports;
        
        
    }
    require.f = {};
    require.e = (chunkId) => {
        // return Promise.all(Object.keys(require.f).reduce((promises, key) => {
        //     require.f[key](chunkId, promises);
        //     return promises;
        // }, []));
        let promises = [];
        require.f.j(chunkId,promises);
        return Promise.all(promises);//等这个promise数组里的promise都成功之后
    };
    require.p = '';
    require.u = (chunkId) => {
        return "" + chunkId + ".js";
    };
    //已安装模块
    var installedChunks = {
        "main": 0,//0表示已经就绪
    };
    require.f.j = (chunkId, promises) => {
        var promise = new Promise((resolve, reject) => {
            installedChunks[chunkId] = [resolve, reject];
        });
        promises.push(promise);
        var url = require.p + require.u(chunkId);
        require.l(url);
    };
    require.l = (url) => {
        let script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);// 一旦添加head里,浏览器会立刻发出请求
    }
    (() => {
        require.d = (exports, definition) => {
            debugger
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
    var webpackJsonpCallback = ([chunkIds, moreModules]) => {
        //chunkIds=['hello']=>[resolve,reject]
        let resolves = chunkIds.map(chunkId => installedChunks[chunkId][0]);

        //把异步加载回来的额外的代码块合并到总的模块定义对象modules上去
        for (let moduleId in moreModules) {
            modules[moduleId] = moreModules[moduleId];
        }
        resolves.forEach(resolve => resolve());
    }
    var chunkLoadingGlobal = window["webpack5"] = [];
    chunkLoadingGlobal.push = webpackJsonpCallback;
    require.e("hello").then(require.bind(require, "./src/hello.js")).then((result) => {
        console.log(result);
    });
})()