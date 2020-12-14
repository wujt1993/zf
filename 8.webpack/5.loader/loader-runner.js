const fs = require("fs");
let readFile = fs.readFile.bind(this);

function createLoaderObject(request) {
    let loaderObj = {
        request,
        normal: null,//loader本身函数
        pitch: null,
        raw: false, // 是否需要转成字符串, false 为默认值
        data: {}, // 每个loader都会有一个自定义的data对象，用来存放一些自定义信息
        pitchExecuted: false,//pitch函数是否执行过
        normalExecuted: false
    }
    let normal = require(loaderObj.request);
    loaderObj.normal = normal;
    loaderObj.raw = normal.raw;
    loaderObj.pitch = normal.pitch;
    return loaderObj;
}

function runLoaders(options,callback){
    let resource = options.resource || '';
    let loaders = options.loaders || [];
    let loaderContext = options.context||{};
    let readResource = options.readResource || readfile;

    let loaderObjects = loaders.map(createLoaderObject);

    loaderContext.resource = resource;
    loaderContext.readResource = readResource;
    loaderContext.loaderIndex = 2;
    loaderContext.loaders = loaderObjects;
    loaderContext.callback = null;
    loaderContext.async = null;

    Object.defineProperty(loaderContext, 'request',{
        get() {
            return loaderContext.loaders.map(l=>l.request).concat(loaderContext.resource).join("!")
        }
    })
    Object.defineProperty(loaderContext,'remainingRequest',{
        get(){
            return loaderContext.loaders.slice(loaderContext.loaderIndex+1).map(l=>l.request).concat(loaderContext.resource).join('!')
        }
    });
    Object.defineProperty(loaderContext,'currentRequest',{
        get(){
            return loaderContext.loaders.slice(loaderContext.loaderIndex).map(l=>l.request).concat(loaderContext.resource).join('!')
        }
    });
    Object.defineProperty(loaderContext,'previousRequest',{
        get(){
            return loaderContext.loaders.slice(0,loaderContext.loaderIndex).map(l=>l.request).concat(loaderContext.resource).join('!')
        }
    });
    console.log(loaderContext.previousRequest)
}

exports.runLoaders = runLoaders;