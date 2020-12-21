class Hook {
    constructor(args) {
        if(!Array.isArray(args)) args = [];
        this._args = args; // 存放所有的形参
        this.taps = [];//存放所有的回调数组
        this.interceptors = []; //存放所有的拦截器
        this.call = CALL_DELEGATE;//初始化call方法
        this.callAsync = CALL_ASYNC_DELEGATE;//初始化call方法
        this.promise = PROMISE_DELEGATE;//初始化call方法
    }

    intercept(interceptor) {
        this.interceptors.push(interceptor)
    }
    tap(options, fn) {
        this._tap('sync', options, fn)
    }

    tapPromise(options, fn) {
        this._tap('promise', options, fn)
    }
    tapAsync(options, fn) {
        this._tap('async', options, fn)
    } 
    _tap(type, options, fn) {
        if(typeof options === "string"){
            options = {name: options}
        }
        let tapInfo = {...options, type, fn};
        tapInfo = this._runRegisterInterceptors(tapInfo);
        this._insert(tapInfo);
    }
    _runRegisterInterceptors(tapInfo) {
        for(const interceptor of this.interceptors) {
            if(interceptor.register) {
                let newTapInfo = interceptor.register(tapInfo);
                if(newTapInfo) tapInfo = newTapInfo
            }
        }
        return tapInfo
    }
    _resetCompilation() {
        this.call = CALL_DELEGATE;//初始化call方法
        this.callAsync = CALL_ASYNC_DELEGATE;//初始化call方法
        this.callAsync = PROMISE_DELEGATE;//初始化call方法
    }
    _insert(tapInfo) {
        this._resetCompilation();
        let i = this.taps.length;
        let stage = 0;
        let before = tapInfo.before;
        if(typeof before=== 'string') {
            before = new Set([before])
        }else if(Array.isArray(before)) {
            before = new Set(before)
        }

        if(typeof tapInfo.stage === 'number')
            stage = tapInfo.stage
        while(i > 0) {
            i--;
            const x = this.taps[i];
            this.taps[i+1] = x;
            const xStage = x.stage || 0;

            if(before) {
                if(before.has(x.name)) {
                    before.delete(x.name);
                    continue;
                }
                if(before.size > 0)
                    continue;
            }
            if(xStage > stage) continue
            i++;
            break;
        }
        this.taps[i] = tapInfo;

    }
    _createCall(type) {
        return this.compile({
            taps: this.taps,
            args: this._args,
            interceptors: this.interceptors,
            type
        })
    }
}
//创建一个call的代理方法
const CALL_DELEGATE = function(...args) {
    //动态的创建call方法，并且赋给this.call
    this.call = this._createCall("sync");
    //执行动态创建出来的call方法
	return this.call(...args);
};

const CALL_ASYNC_DELEGATE = function(...args) {
	this.callAsync = this._createCall("async");
	return this.callAsync(...args);
};

const PROMISE_DELEGATE = function(...args) {
	this.promise = this._createCall("promise");
	return this.promise(...args);
};



module.exports = Hook;