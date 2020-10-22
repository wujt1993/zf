import { nextTick } from "../util.js";

let has = {};
let queue = [];
let pending  = false;


function flushSchedularQueue() {
    for(let i = 0, len = queue.length; i < len; i++) {
        queue[i].run()
    }
    has = {};
    queue = [];
    pending  = false;
}



export function queueWatcher(watcher) {
    let id = watcher.id;
    if(has.id == null) {
        has.id = id;
        queue.push(watcher);
        if(!pending) {
            pending = true;
            // setTimeout(()=>{
            //     flushSchedularQueue()
            // },0)
            nextTick(flushSchedularQueue)
        }
    }
}