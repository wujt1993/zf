import { nextTick } from "../util";

let has = {};
let queue = [];
let pending = false
function flushSchedularQueue() {
    for(let i = 0; i < queue.length; i++) {
        let watcher = queue[i];
        watcher.run();
    }
    has = {};
    queue = [];
    pending = false;
}
export function queueWatcher(watcher){
    let id = watcher.id;
    if(!has[id]) {
        has[id] = true;
        queue.push(watcher);
        if(!pending) {
            pending = true;
            nextTick(flushSchedularQueue)
        }
    }

}