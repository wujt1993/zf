const events = require("events")

class MyEvents extends events {
}

let myEvents = new MyEvents();
// 只处理一次，避免无限循环。
myEvents.once('newListener', (event, listener) => {
    if (event === 'event') {
        // 在前面插入一个新的监听器。
        myEvents.on('event', () => {
            console.log('B');
        });
    }
});
myEvents.on('event', () => {
    console.log('A');
});
myEvents.emit("event")
