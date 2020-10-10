const STATUS = {pending: 'pending', fulfilled: 'fulfilled', rejected: 'rejected'}

function resolvePromise(x, promise2, resolve, reject) {
    if(x == promise2) throw Error("报错了");
    let islock = false;
    if((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try{
            if(x.then && typeof x.then === 'function') {
                x.then.call(x, function(y) {
                    resolvePromise(y,promise2, resolve, reject)
                }, function(r) {
                    if(islock) return;
                    islock = true;
                    reject(r)
                })
            } else {
                resolve(x);
            }
        }catch(e) {
            if(islock) return;
            islock = true;
            reject(e)
        }
        
    } else{
        resolve(x)
    }
}
class Promise{
    constructor(executor) {
        this.status = STATUS.pending;
        this.data  = null;
        this.reason = null;
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];
        const resolve = (data) => {
            if(data.then && typeof data.then === "function"){ // 是promise 就继续递归解析
                return data.then(resolve,reject)
            }
            if(this.status == STATUS.pending) {
                this.status = STATUS.fulfilled;
                this.data = data;
                this.onFulfilledCallback.forEach(fn => fn())
            }
        }
        const reject = (reason) => {
            if(this.status == STATUS.pending) {
                this.status = STATUS.rejected;
                this.reason = reason;
                this.onRejectedCallback.forEach(fn => fn())
            }
        }
        try{
            executor(resolve, reject)
        }catch(err) {
            reject(err)
        }
        
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x=>x;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}

        let promise2 = new Promise((resolve, reject) => {
            if(this.status == STATUS.fulfilled) {
                setTimeout(()=>{
                    try{
                        let x = onFulfilled(this.data);
                        resolvePromise(x, promise2, resolve, reject);
                    }catch(e) {
                        reject(e)
                    }
                },0)
                
                
            }
            if(this.status == STATUS.rejected) {
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason);
                        resolvePromise(x, promise2, resolve, reject);
                    }catch(e) {
                        reject(e)
                    }
                },0)
            }
            if(this.status == STATUS.pending) {
                this.onFulfilledCallback.push(() => {
                    setTimeout(()=>{
                        try{
                            let x = onFulfilled(this.data);
                            resolvePromise(x, promise2, resolve, reject);
                        }catch(e) {
                            reject(e)
                        }
                    },0)
                })
                this.onRejectedCallback.push(() => {
                    setTimeout(()=>{
                        try{
                            let x = onRejected(this.reason);
                            resolvePromise(x, promise2, resolve, reject);
                        }catch(e) {
                            reject(e)
                        }
                    })
                })
            }
        });
        return promise2;
    }

    catch(err) {
        this.then(null, err)
    }
    

    finally(callback) {
        return this.then(
            data => {
                return Promise.resolve(callback()).then(()=>data)
            },
            err => {
                return  Promise.resolve(callback()).then(()=>{throw err})
            }
        )
    }

    static resolve(val) {
        if(val.constructor == Promise) {
            return val
        }else {
            return new Promise((resolve,reject)=>{
                resolve(val);
            }) 
        }
    }

    static reject(reason){ // 失败的promise
        return new Promise((resolve,reject)=>{
            reject(reason);
        })
    }

    static race(promises){
        return new Promise((resolve, reject)=>{
            for(let i = 0; i < promises.length; i++) {
                if(promises[i].then && typeof promises[i].then === "function"){
                    promises[i].then(data=> {
                        resolve(data)
                    }, err => {
                        reject(err)
                    })
                }else{
                    resolve(promises[i])
                }
                
            }
        })
    }

    static all(promises) {
        return new Promise((resolve, reject)=>{
            let count = 0;
            let res = []
            function resolveData(index, data) {
                count++;
                res[index] = data;
                if(count == promises.length) {
                    resolve(res)
                }
            }
            for(let i = 0; i < promises.length; i++) {
                if(promises[i].then && typeof promises[i].then === "function"){
                    promises[i].then(data=> {
                        resolveData(i, data)
                    }, err => {
                        reject(err)
                    })
                }else{
                    resolveData(i, promises[i])
                }
                
            }
        })
    }
}
Promise.deffered = function(){
    let dfd  = {};
    dfd.promise = new Promise((resolve, reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject
    })
    return dfd 
}
module.exports = Promise;