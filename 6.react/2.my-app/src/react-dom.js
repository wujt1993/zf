
import {addEvent} from  './event'

function render(vdom, container) {
     // 1.将虚拟节点vdom 转为真实节点 dom
    let dom = createDOM(vdom)
    // 4.将真实节点 dom 挂载到container
    
    container.appendChild(dom);

    dom.componentDidMount && dom.componentDidMount();
}

export function createDOM(vdom) {
    if(typeof vdom === 'string' || typeof vdom === 'number') {
        return document.createTextNode(vdom);
    }
    let {type, props} = vdom;
    let dom ;
    if(typeof type === 'function') {
        if(type.isReactComponent) {
            return mountClassComponent(vdom);
        }
        return mountFunctionComponent(vdom);
    }else {
        dom = document.createElement(type);
    }
    
    //2.将虚拟节点vdom 的属性赋值给dom
    updateProps(dom, props);
    //3.将vdom上子元素挂载到dom上
    if(typeof props.children === 'string' || typeof props.children === 'number') {
        dom.textContent = props.children;
    }else if(typeof props.children === 'object' && props.children.type) {
        render(props.children, dom);
    }else if(Array.isArray(props.children)) {
        reconcileChildren(props.children, dom);
    }else {
        document.textContent = props.children ? props.children.toString() : '';
    }
    return dom;
}

//处理类组件
function mountClassComponent(vdom) {
    let {type, props} = vdom;
    let classInstance = new type(props);
    classInstance.componentWillMount&&classInstance.componentWillMount();
    let renderDOM = classInstance.render();
    let dom = createDOM(renderDOM);
    classInstance.dom = dom;
    dom.componentDidMount = classInstance.componentDidMount.bind(classInstance);
    return dom;

}


//处理函数组件
function mountFunctionComponent(vdom) {
    let {type, props} = vdom;
    let renderDOM = type(props);
    return createDOM(renderDOM)
}

//处理子节点
function reconcileChildren(childVdom, parentDOM) {
    for(let i = 0; i < childVdom.length; i++) {
        let child = childVdom[i];
        render(child, parentDOM)
    }
}

//更新属性
function updateProps(dom, newProps) {
    for(let key in newProps) {
        if(key === 'children') continue;
        if(key === 'style') {
            for(let item in newProps[key]) {
                dom.style[item] = newProps[key][item]
            }
        }else if(key.startsWith('on')) {
            // dom[key.toLowerCase()] = newProps[key]
            addEvent(dom, key.toLowerCase(), newProps[key])
        }else {
            dom[key] = newProps[key];
            
        }
    }
}


const ReactDOM = {
    render
}

export default ReactDOM;