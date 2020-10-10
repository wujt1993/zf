const EventEmitter = require("events");

class MyEvents extends EventEmitter{

}
const myEvents = new MyEvents();
myEvents.on("say", function() {
    console.log("hello events")
})

myEvents.on("say", function() {
    console.log("hello events again")
})

myEvents.emit("say")


myEvents.on("setName", function(name) {
    //this 指向 myEvents
    this.name = name
})

myEvents.emit("setName", "tomcat")
console.log(myEvents.name)