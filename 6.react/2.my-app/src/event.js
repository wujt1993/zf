
import {updateQueue} from  './Component'

export function addEvent(dom, eventType, listener) {
    let store = dom.store || (dom.store = {});
    store[eventType] = listener; 
    if(!document[eventType]) {
        document[eventType] = dispatchEvent;
    }
}
let syntheticEvent = {};
function dispatchEvent(event) {
    let {type, target} = event;
    let eventType = `on${type}`;
    updateQueue.isBatchingUpdate = true;//把队列设置为批量更新模式
    createSyntheticEvent(event);
    while(target){
        let {store}=target;
        let handleClick = store&&store[eventType];
        handleClick&&handleClick.call(target,syntheticEvent);
        target=target.parentNode;
    }
    for(let key in syntheticEvent){
        syntheticEvent[key]=null;
    }
    updateQueue.isBatchingUpdate = false
    updateQueue.batchUpdate();//批量更新一下
}

function createSyntheticEvent(nativeEvent) {
    for(let key in nativeEvent) {
        syntheticEvent[key] = nativeEvent[key]
    }
}