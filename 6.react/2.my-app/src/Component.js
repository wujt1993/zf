
import { compareTwoVdom, findDOM } from './react-dom'
export let updateQueue = {
    updaters: [],
    isBatchingUpdate: false,
    add: function (updater) {
        this.updaters.push(updater)
    },
    batchUpdate() {
        this.updaters.forEach(updater => updater.updateComponent());
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
        if (typeof callback === 'function') this.callbacks.push(callback);
        // updateQueue.isBatchingUpdate ? updateQueue.add(this) : this.updateComponent();
        this.emitUpdate()
    }

    emitUpdate(newPrpos) {
        this.nextProps = newPrpos;
        if (updateQueue.isBatchingUpdate) {
            updateQueue.add(this)
        } else {
            this.updateComponent();
        }
    }
    updateComponent() {
        let { classInstance, pendingState, nextProps } = this;
        if (nextProps || pendingState.length > 0) {
            shouldUpdate(classInstance, this.nextProps, this.getState(nextProps))
            // classInstance.state = this.getState()
            // classInstance.forceUpdate();
            this.callbacks.forEach(cb => cb());
            this.callbacks.length = 0;
        }
    }


    getState(nextProps) {
        let { classInstance, pendingState } = this;
        let { state } = classInstance;
        for (let i = 0; i < pendingState.length; i++) {
            let nextState = pendingState[i];
            if (typeof nextState === 'function') {
                nextState = nextState.call(classInstance, state);
            }
            state = { ...state, ...nextState }
        }
        pendingState.length = 0
        if (classInstance.constructor.getDerivedStateFromProps) {
            let partialState = classInstance.constructor.getDerivedStateFromProps(nextProps, classInstance.state);
            if (partialState) {
                state = { ...state, ...partialState };
            }
        }
        return state;
    }
}

function shouldUpdate(classInstance, nextProps, nextState) {

    let willUpdate = true;//是否要更新
    if (classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(nextProps, nextState)) {
        willUpdate = false
    }
    if (willUpdate && classInstance.componentWillUpdate) {
        classInstance.componentWillUpdate();
    }
    classInstance.prevState = classInstance.state
    classInstance.prevprops = classInstance.props
    classInstance.state = nextState;
    if (nextProps) {
        classInstance.props = nextProps;
    }
    if (willUpdate)
        classInstance.updateComponent();
}
export class Component {
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
        if (this.constructor.getDerivedStateFromProps) {
            let partialStete = this.constructor.getDerivedStateFromProps(nextProps, nextState);
            if (partialStete)
                nextState = { ...nextState, ...partialStete }
        }
        this.state = nextState;
        this.updateComponent()
    }
    updateComponent() {

        let newRenderVdom = this.render();
        let oldRenderVdom = this.oldRenderVdom;
        let parentNode = findDOM(oldRenderVdom).parentNode;
        let extraArgs = this.getSnapshotBeforeUpdate && this.getSnapshotBeforeUpdate();
        compareTwoVdom(parentNode, oldRenderVdom, newRenderVdom);
        this.oldRenderVdom = newRenderVdom;
        // let newVdom = this.render();
        // updateClassComponent(this, newVdom);
        this.componentDidUpdate && this.componentDidUpdate(this.prevprops, this.prevState, extraArgs);
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
export class PureComponent extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state)
    }
}

function shallowEqual(obj1, obj2) {
    if (obj1 === obj2)//如果引用地址是一样的，就相等.不关心属性变没变
        return true;
    //任何一方不是对象或者 不是null也不相等  null null  NaN!==NaN
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;//属性的数量不一样，不相等
    }
    for (let key of keys1) {
        if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}