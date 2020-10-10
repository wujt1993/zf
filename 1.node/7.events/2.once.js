const events = require("events")

class MyEvents extends events{
    constructor() {
        super()
        this.a = 1
    }
}

let myEvents = new MyEvents();
myEvents.on("add", function() {
    this.a++
})

myEvents.emit("add")
myEvents.emit("add")
myEvents.emit("add")
console.log(myEvents.a)

//只能订阅一次
myEvents.once('del', function() {
    this.a--
})

myEvents.emit("del")
myEvents.emit("del")//不生效
console.log(myEvents.a)