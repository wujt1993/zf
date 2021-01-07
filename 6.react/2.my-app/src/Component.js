
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

    emitUpdate(newPrpos) {
        this.nextProps = newPrpos;
        if(updateQueue.isBatchingUpdate) {
            updateQueue.add(this)
        }else{
            this.updateComponent();
        }
    }
    updateComponent() {
        let {classInstance, pendingState, nextProps} = this;
        if(nextProps || pendingState.length > 0) {
            shouldUpdate(classInstance, this.nextProps ,this.getState(nextProps))
            // classInstance.state = this.getState()
            // classInstance.forceUpdate();
            this.callbacks.forEach(cb => cb());
            this.callbacks.length = 0;
        }
    }

    
    getState(nextProps) {
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
        if(classInstance.constructor.getDerivedStateFromProps){
            let partialState = classInstance.constructor.getDerivedStateFromProps(nextProps,classInstance.state );
            if(partialState){
                state={...state,...partialState};
            }
        }
        return state;
    }
}

function shouldUpdate(classInstance, nextProps , nextState) {
    
    let willUpdate = true;//是否要更新
    if(classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(nextProps, nextState)) {
        willUpdate = false
    }
    if(willUpdate && classInstance.componentWillUpdate) {
        classInstance.componentWillUpdate();
    }

    classInstance.state = nextState;

    if(nextProps){
        classInstance.props = nextProps;
    }
    if(willUpdate)
        classInstance.updateComponent();
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
        let nextState = this.state;
        let nextProps = this.props;
        if(this.constructor.getDerivedStateFromProps) {
            let partialStete = this.constructor.getDerivedStateFromProps(nextProps, nextState);
            if(partialStete)
                nextState = {...nextState, ...partialStete}
        }
        this.state = nextState;
        this.updateComponent()
    }
    updateComponent() {
        let newRenderVdom = this.render();
        let oldRenderVdom = this.oldRenderVdom;
        let parentNode = oldRenderVdom.dom.parentNode;
        compareTwoVdom(parentNode, oldRenderVdom, newRenderVdom);
        this.oldRenderVdom = newRenderVdom;
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