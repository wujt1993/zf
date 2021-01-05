
import {compareTwoVdom} from './react-dom'
export let updateQueue = {
    updaters: [],
    isBatchingUpdate: false,
    add: function(updater) {
        this.updaters.push(updater)
    },
    batchUpdate() {
        this.updaters.forEach(updater=>updater.updateComponent());
        this.isBatchingUpdate = false;
    }
}
class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance;
        this.pendingState = [];
        this.callbacks = [];
    }

    addState(partialState, callback) {
        this.pendingState.push(partialState);
        if(typeof callback === 'function') this.callbacks.push(callback);
        // updateQueue.isBatchingUpdate ? updateQueue.add(this) : this.updateComponent();
        this.emitUpdate()
    }

    emitUpdate() {
        if(updateQueue.isBatchingUpdate) {
            updateQueue.add(this)
        }else{
            this.updateComponent();
        }
    }
    updateComponent() {
        let {classInstance, pendingState} = this;
        if(pendingState.length > 0) {
            shouldUpdate(classInstance, this.getState())
            // classInstance.state = this.getState()
            // classInstance.forceUpdate();
            this.callbacks.forEach(cb => cb());
            this.callbacks.length = 0;
        }
    }

    
    getState() {
        let {classInstance, pendingState} = this;
        let {state} = classInstance;
        for(let i = 0; i < pendingState.length; i++) {
            let nextState = pendingState[i];
            if(typeof nextState === 'function'){
                nextState = nextState.call(classInstance, state);
            }
            state = {...state, ...nextState}
        }
        pendingState.length = 0
        return state;
    }
}

function shouldUpdate(classInstance, nextState) {
    classInstance.state = nextState;
    if(classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(classInstance.props, nextState)) {
        return
    }

    
    classInstance.forceUpdate();
}
class Component {
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
        this.state = {};
        this.updater = new Updater(this);
    }

    setState(partialState, callback) {
        this.updater.addState(partialState, callback);
    }


    forceUpdate() {
        this.componentWillUpdate && this.componentWillUpdate();
        let newRenderVdom = this.render();
        let oldRenderVdom = this.oldRenderVdom;
        let parentNode = oldRenderVdom.dom.parentNode;
        compareTwoVdom(parentNode, oldRenderVdom, newRenderVdom)
        // let newVdom = this.render();
        // updateClassComponent(this, newVdom);
        this.componentDidUpdate && this.componentDidUpdate();
    }


    render() {
        throw new Error("需要实现子类")
    }
}

//更新类组件
// function updateClassComponent(classInstance, newVdom) {
//     let oldDOM = classInstance.dom;
//     let newDOM = createDOM(newVdom);
//     oldDOM.parentNode.replaceChild(newDOM, oldDOM);
//     classInstance.dom = newDOM;
// }
export default Component;