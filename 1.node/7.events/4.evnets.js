// const events = require("./events")
const events = require("events")


class MyEvents extends events {

}

const myEvents = new MyEvents();

myEvents.on("newListener", function(type) {
    console.log("------------------------------------------type:" + type)
})
let fn1 = function() {
    console.log("hello events again")
}

myEvents.on("say", fn1)

myEvents.on("say", fn1)

myEvents.off("say", fn1);

myEvents.emit("say");

myEvents.on("setName", function(name) {
    console.log(this === myEvents)
    console.log(name)
})

myEvents.emit("setName", "tomcat");


myEvents.once("once", function(){
    console.log("once~~~~~~~~~~~~~~~~~~~~~~~~~~~~`")
})
myEvents.once("once", function(){
    console.log("once1~~~~~~~~~~~~~~~~~~~~~~~~~~~~`")
})

myEvents.emit("once")
myEvents.emit("once")