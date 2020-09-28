class MyEvent {
    constructor() {
        this.onCallbacks = {}
    }
    
    once(event, fn) {
        const once = (...args) =>{
            fn(...args)
            this.off(event, once)
        }
        once.l = fn;
        this.on(event, once)
    } 

    on(event, fn) {
        if(event != "newListener") {
            this.emit("newListener", event)
        }


        if(this.onCallbacks[event]) {
            this.onCallbacks[event].push(fn)
        }else{
            this.onCallbacks[event] = [fn]
        }
    }

    emit(event, ...args) {
        if(this.onCallbacks[event]) {
            this.onCallbacks[event].forEach(fn => {
                fn.call(this,...args)
            })
        }
    }

    off(event, callback) {
        if(!this.onCallbacks[event]) return
        this.onCallbacks[event] = this.onCallbacks[event].filter(fn=> {
            return callback !== fn && callback !== fn.l 
        })
    }
}

module.exports = MyEvent