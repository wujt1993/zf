const fs = require("fs");
const path = require("path");
const readFile = fs.readFile.bind(this);


function createLoaderObj(request) {
    let loaderObj = {
        request,
        normal: null,//，每个loader的loader方法
        pitch: null,
        data: {},
        pitchExecuted: false,
        normalExecuted: false,
        raw: false //false代表输出字符串，true为buffer
    }

    let normal = require(request);
    loaderObj.normal = normal;
    loaderObj.raw = normal.raw || false;
    loaderObj.pitch = normal.pitch;
    return loaderObj;
}
function processResource(processOptions,loaderContext,finalCallback) {
    loaderContext.loaderIndex = loaderContext.loaderIndex - 1;
    let resourcePath = loaderContext.resource;
    loaderContext.readResource(resourcePath,(err, resourceBuffer)=>{
        if(err)finalCallback(err);
        processOptions.resourceBuffer = resourceBuffer;
        iterateNormalLoaders(processOptions, loaderContext, [resourceBuffer], finalCallback)
    })
}
function convertArgs(args,raw){
    if(raw&&!Buffer.isBuffer(args[0])){//想要Buffer,但不是Buffer,转成Buffer
        args[0]= Buffer.from(args[0]);
    }else if(!raw&&Buffer.isBuffer(args[0])){//想要Buffer,但不是Buffer,转成Buffer
        args[0]=args[0].toString('utf8');
    }
}
function iterateNormalLoaders(processOptions,loaderContext,args,finalCallback) {
    if(loaderContext.loaderIndex < 0) {
        return finalCallback(null, args)
    }
    let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
    let normalFunction = currentLoaderObject.normal;
    if(currentLoaderObject.normalExecuted) {
        loaderContext.loaderIndex--;
        return iterateNormalLoaders(processOptions, loaderContext, args, finalCallback);
    }
    currentLoaderObject.normalExecuted = true;
    convertArgs(args,currentLoaderObject.raw);
    runSyncOrAsync(normalFunction, loaderContext, args, (err, ...values)=>{
        if(err)finalCallback(err);
        iterateNormalLoaders(processOptions,loaderContext,values,finalCallback);
    })
}
function iteartePitchLoaders(processOptions, loaderContext, finalCallback) {

    if(loaderContext.loaderIndex>=loaderContext.loaders.length){
        return processResource(processOptions,loaderContext,finalCallback);
    }

    let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
    let pitchFunction = currentLoaderObject.pitch;
    if(!pitchFunction) {
        loaderContext.loaderIndex++;
        return iteartePitchLoaders(processOptions, loaderContext, finalCallback);
    }

    if(currentLoaderObject.pitchExecuted) {
        loaderContext.loaderIndex++;
        return iteartePitchLoaders(processOptions, loaderContext, finalCallback);
    }

    currentLoaderObject.pitchExecuted = true;

    runSyncOrAsync(pitchFunction, loaderContext, [loaderContext.remainingRequest, loaderContext.previousRequest, loaderContext.dara], (err, ...values)=>{
        if(values.length > 0 && !!values[0]) {
            loaderContext.loaderIndex--;
            iterateNormalLoaders(processOptions, loaderContext, values ,finalCallback)
        }else{
            iteartePitchLoaders(processOptions, loaderContext, finalCallback);
        }
    })

}

function runSyncOrAsync(fn, context, args, callback) {
    let isSync = true; //默认是同步的
    let isDone = false; // 未执行
    let innerCallback = context.callback = function(err, ...values) {
        isDone = true;
        isSync = false;
        callback(err, ...values)
    }

    context.async = function() {
        isSync = false;
        return innerCallback;
    }
    let result = fn.apply(context,args);
    if(isSync) {
        isDone = true;
        return callback(null, result);
    }
}

function runLoaders(options, callback) {
    let loaderContext = options.context || {};
    let resource = options.resource || '';
    let loaders = options.loaders || [];
    let loaderObjects = loaders.map(createLoaderObj);
    let readResource = options.readResource || readFile;
    loaderContext.resource = resource;
    loaderContext.loaders = loaderObjects;
    loaderContext.readResource = readResource;
    loaderContext.loaderIndex = 0;
    loaderContext.callback = null;

    Object.defineProperty(loaderContext, 'request', {
        get() {
            return loaderContext.loaders.map(l=>l.request).concat(resource).join("!");
        }
    });
    //执行过的loader
    Object.defineProperty(loaderContext, 'previousRequest', {
        get() {
            return loaderContext.loaders.slice(0,loaderContext.loaderIndex).map(l=>l.request).concat(resource).join("!");
        }
    });

    //未执行的loader 
    Object.defineProperty(loaderContext, 'remainingRequest', {
        get() {
            return loaderContext.loaders.slice(loaderContext.loaderIndex+1).map(l=>l.request).concat(resource).join("!");
        }
    });

    //现在执行的loader
    Object.defineProperty(loaderContext, 'currentRequest', {
        get() {
            return loaderContext.loaders.slice(loaderContext.loaderIndex).map(l=>l.request).concat(resource).join("!");
        }
    });
    Object.defineProperty(loaderContext, 'data', {
        get() {
            let currentLoader = loaderContext.loaders[loaderContext.loaderIndex];
            return currentLoader.data;
        }
    });

    let processOptions = {
        resourceBuffer: null
    }

    //开始执行loader

    iteartePitchLoaders(processOptions, loaderContext, (err, result)=>{
        callback(err,{
            result,
            resourceBuffer: processOptions.resourceBuffer
        })
    })

}

exports.runLoaders = runLoaders;