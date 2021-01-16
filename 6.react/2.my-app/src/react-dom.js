
import { REACT_TEXT } from './constants';
import { addEvent } from './event'
//TODO 有bug
let hookStates = [];
let hookIndex = 0;
let scheduleUpdate;
function render(vdom, container) {
    mount(vdom, container)
    scheduleUpdate = () => {
        hookIndex = 0;
        compareTwoVdom(container, vdom, vdom);
    }
}

export function useImperativeHandle(ref, handler) {
    ref.current = handler()
}
export function useRef(initialState) {
    hookStates[hookIndex] =  hookStates[hookIndex] || {current: initialState}
    return hookStates[hookIndex++]
}
export function useLayoutEffect(callback, deps) {
    if(hookStates[hookIndex]) {
        let [lastCallback, lastDeps] = hookStates[hookIndex];
        let same = deps && deps.every((item, index) => item === lastDeps[index]);
        if(same) {
            hookIndex++;
        }else {
            lastCallback && lastCallback();
            queueMicrotask(()=>{
                hookStates[hookIndex] = [callback(), deps]
            })
        }
    }else {
        queueMicrotask(()=>{
            hookStates[hookIndex] = [callback(), deps];
        })
        
    }
}
export function useEffect(callback, deps) {
    if (hookStates[hookIndex]) {
        let [lastCallback, lastDeps] = hookStates[hookIndex];
        let same = deps && deps.every((item, index) => item === lastDeps[index]);
        if(same) {
            hookIndex++;
        }else {
            lastCallback && lastCallback();
            setTimeout(()=>{
                hookStates[hookIndex] = [callback(), deps]
            })
        }
    } else {
        setTimeout(()=>{
            hookStates[hookIndex] = [callback(), deps]
        })
        
    }
}
export function useContext(context) {
    return context._currentValue
}
export function useMemo(factory, deps) {
    if (hookStates[hookIndex]) {
        let [lastMemo, lastDeps] = hookStates[hookIndex];
        let same = deps && deps.every((item, index) => { return item === lastDeps[index] });
        if (same) {
            hookIndex++;
            return lastMemo;
        } else {
            let newMemo = factory();
            hookStates[hookIndex++] = [newMemo, deps];
            return newMemo;
        }
    } else {
        let newMemo = factory();
        hookStates[hookIndex++] = [newMemo, deps];
        return newMemo;
    }
}

export function useCallback(callback, deps) {
    if (hookStates[hookIndex]) {
        let [lastCallback, lastDeps] = hookStates[hookIndex];
        let same = deps.every((item, index) => { return item === lastDeps[index] });
        if (same) {
            hookIndex++;
            return lastCallback;
        } else {
            hookStates[hookIndex++] = [callback, deps];
            return callback;
        }
    } else {
        hookStates[hookIndex++] = [callback, deps];
        return callback;
    }
}

export function useReducer(reducer, initialState) {
    hookStates[hookIndex] = hookStates[hookIndex] || (typeof initialState === 'function' ? initialState() : initialState);
    let currentIndex = hookIndex;
    function dispatch(action) {
        let lastState = hookStates[currentIndex];//获取老状态
        let nextState;
        if (typeof action === 'function') {
            nextState = action(lastState);
        }
        if (reducer) {
            nextState = reducer(lastState, action);
        }
        hookStates[currentIndex] = nextState;
        scheduleUpdate();//当状态改变后要重新更新应用
    }
    return [hookStates[hookIndex++], dispatch];
}

export function useState(initialState) {
    // hookStates[hookIndex] = hookStates[hookIndex] || (typeof initialState === 'function' ? initialState() : initialState);
    // let currentIndex = hookIndex;
    // function setState(newState) {
    //     if(typeof newState === 'function') newState = newState(hookStates[hookIndex]);
    //     hookStates[currentIndex] = newState;
    //     scheduleUpdate()
    // }
    // return [hookStates[hookIndex++], setState];
    return useReducer(null, initialState)

}

function mount(vdom, container) {
    // 1.将虚拟节点vdom 转为真实节点 dom
    let dom = createDOM(vdom)
    // 4.将真实节点 dom 挂载到container
    container.appendChild(dom);
}

export function createDOM(vdom) {
    // if (typeof vdom === 'string' || typeof vdom === 'number') {
    //     return document.createTextNode(vdom);
    // }
    let { type, props, ref } = vdom;
    let dom;
    if (type === REACT_TEXT) {
        dom = document.createTextNode(props.content);
    } else if (typeof type === 'function') {
        if (type.isReactComponent) {
            return mountClassComponent(vdom);
        }
        return mountFunctionComponent(vdom);
    } else {
        dom = document.createElement(type);
    }

    //2.将虚拟节点vdom 的属性赋值给dom
    updateProps(dom, {}, props);
    //3.将vdom上子元素挂载到dom上
    if (typeof props.children === 'string' || typeof props.children === 'number') {
        dom.textContent = props.children;
    } else if (typeof props.children === 'object' && props.children.type) {
        render(props.children, dom);
    } else if (Array.isArray(props.children)) {
        reconcileChildren(props.children, dom);
    } else {
        document.textContent = props.children ? props.children.toString() : '';
    }
    vdom.dom = dom;
    if (ref) {
        ref.current = dom;
    }
    return dom;
}

//处理类组件
function mountClassComponent(vdom) {
    let { type, props, ref } = vdom;
    let classInstance = new type(props);
    vdom.classInstance = classInstance;
    if(ref) classInstance.ref = ref;
    if (type.contextType) {
        classInstance.context = type.contextType._currentValue;
    }
    classInstance.componentWillMount && classInstance.componentWillMount();
    if (type.getDerivedStateFromProps) {
        let partialState = type.getDerivedStateFromProps(classInstance.props, classInstance.state);
        if (partialState) {
            classInstance.state = { ...classInstance.state, ...partialState }
        }
    }
    let renderDOM = classInstance.render();
    classInstance.oldRenderVdom = vdom.oldRenderVdom = renderDOM;
    let dom = createDOM(renderDOM);
    if (classInstance.componentDidMount) {
        dom.componentDidMount = classInstance.componentDidMount.bind(classInstance);
    }

    classInstance.dom = dom;
    return dom;

}



//处理函数组件
function mountFunctionComponent(vdom) {
    let { type, props } = vdom;
    let renderDOM = type(props);
    vdom.oldRenderVdom = renderDOM;
    return createDOM(renderDOM)
}

//处理子节点
function reconcileChildren(childVdom, parentDOM) {
    for (let i = 0; i < childVdom.length; i++) {
        let child = childVdom[i];
        render(child, parentDOM)
    }
}

//更新属性
function updateProps(dom, oldProps, newProps) {
    for (let key in newProps) {
        if (key === 'children') continue;
        if (key === 'style') {
            for (let item in newProps[key]) {
                dom.style[item] = newProps[key][item]
            }
        } else if (key.startsWith('on')) {
            // dom[key.toLowerCase()] = newProps[key]
            addEvent(dom, key.toLowerCase(), newProps[key])
        } else {
            dom[key] = newProps[key];

        }
    }
}

export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
    if (!oldVdom && !newVdom) {
        return
    } else if (!oldVdom && newVdom) {
        let newDOM = createDOM(newVdom);
        if (nextDOM) {
            parentDOM.insertBefore(newDOM, nextDOM)
        } else {
            parentDOM.appendChild(newDOM)
        }
        newDOM.classInstance.componentDidMount && newDOM.classInstance.componentDidMount();
    } else if (oldVdom && !newVdom) {
        let currentDOM = findDOM(oldVdom);
        if (currentDOM) {
            parentDOM.removeChild(currentDOM)
        }
        oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount && oldVdom.classInstance.componentWillUnmount();
    } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
        let oldDOM = findDOM(oldVdom);
        let newDOM = createDOM(newVdom);
        parentDOM.replaceChild(newDOM, oldDOM);
        oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount && oldVdom.classInstance.componentWillUnmount();
        newDOM.classInstance.componentDidMount && newDOM.classInstance.componentDidMount();
    } else {
        updateElement(oldVdom, newVdom);
    }

}

function updateElement(oldVdom, newVdom) {
    if (oldVdom.type === REACT_TEXT) {
        let currentDOM = newVdom.dom = oldVdom.dom;
        if (newVdom.props.content !== oldVdom.props.content) {
            currentDOM.textContent = newVdom.props.content;
        }

    } else if (typeof oldVdom.type === 'string') {
        let currentDOM = newVdom.dom = oldVdom.dom;
        updateProps(currentDOM, oldVdom.props, newVdom.props);
        updateChild(currentDOM, oldVdom.props.children, newVdom.props.children)
    } else if (typeof oldVdom.type === 'function') {
        if (oldVdom.type.isReactComponent) {
            updateClassComponent(oldVdom, newVdom);
        } else {
            updateFunctionComponent(oldVdom, newVdom);
        }
    }
}
function updateFunctionComponent(oldVdom, newVdom) {
    let parentDOM = findDOM(oldVdom).parentNode;
    let { type, props } = newVdom;
    let oldRenderVdom = oldVdom.oldRenderVdom;
    let newRenderVdom = type(props);
    compareTwoVdom(parentDOM, oldRenderVdom, newRenderVdom);
    newVdom.oldRenderVdom = newRenderVdom;
}
function updateClassComponent(oldVdom, newVdom) {
    let classInstance = newVdom.classInstance = oldVdom.classInstance;
    newVdom.oldRenderVdom = oldVdom.oldRenderVdom;
    classInstance.componentWillReceiveProps && classInstance.componentWillReceiveProps();
    //触发组件的更新，要把新的属性传过来
    classInstance.updater.emitUpdate(newVdom.props);

}
function updateChild(parentDOM, oldVChildren, newVChildren) {
    oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren];
    newVChildren = Array.isArray(newVChildren) ? newVChildren : [newVChildren];
    let maxLength = Math.max(oldVChildren.length, newVChildren.length);
    for (let i = 0; i < maxLength; i++) {
        let nextDOM = oldVChildren.find((item, index) => index > i && item && item.dom);
        compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i], nextDOM && nextDOM.dom)
    }
}

export function findDOM(vdom) {
    let { type } = vdom;
    let dom;
    if (typeof type === "function") {
        dom = findDOM(vdom.oldRenderVdom)
    } else {
        dom = vdom.dom
    }
    return dom;
}

const ReactDOM = {
    render
}

export default ReactDOM;