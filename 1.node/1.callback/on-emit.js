let objEvent = {
    arr: [],//存放发布事件
    on(fn) { //订阅事件
        this.arr.push(fn)
    },
    emit() { // 发布事件
        this.arr.forEach(fn => fn())
    }
}
let obj = {}
objEvent.on(()=>{
    if(Object.keys(obj).length == 2) {
        console.log(obj)
    }
})

setTimeout(()=>{
    obj.name = "test";
    objEvent.emit()
}, Math.random() * 1000)

setTimeout(()=>{
    obj.age = 1;
    objEvent.emit()
}, Math.random() * 1000)
