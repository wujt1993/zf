
import {isSameVnode} from './index'

export function patch(oldVnode, vnode) {
    // oldVnode 是一个真实的元素
    //1、组件
    if(!oldVnode){
        return createElm(vnode); // 根据虚拟节点创建元素
    }

    
    const isRealElement = oldVnode.nodeType
    //2、初次渲染
    if (isRealElement) {
        // 初次渲染
        const oldElm = oldVnode; // id="app"
        const parentElm = oldElm.parentNode; // body
        let el = createElm(vnode);
        parentElm.insertBefore(el, oldElm.nextSibling); // 将创建的节点查到原有的节点的下一个
        parentElm.removeChild(oldElm);
        return el; // vm.$el
    } else {
        //3、数据更新渲染
        // diff算法
        //1、当标签名不同，直接将旧的元素替换成新的元素
        if(oldVnode.tag !== vnode.tag) {
            return oldVnode.el.parentElement.replaceChild(createElm(vnode), oldVnode.el);
        }

        //2、标签一样，但文本不一样
        if(!oldVnode.tag) {
            if(oldVnode.text !== vnode.text) {
                oldVnode.el.textContent = vnode.text;
            }
        }

        //3、属性不一样
        let el = vnode.el = oldVnode.el;
        updateProperties(vnode, oldVnode.data);

        //4、更新子元素
        let oldChildren = oldVnode.children || [];
        let newChildren = vnode.children || [];

        if(oldChildren.length > 0 && newChildren.length > 0) {
            updateChildren(el, oldChildren, newChildren);
        }else if(oldChildren.length > 0) {
            oldVnode.el.innerHTML = "";
        }else if(newChildren.length > 0) {
            newChildren.forEach(child => {
                oldVnode.el.appendChild(createElm(child))
            })
        }
    }
}

function updateChildren(parent, oldChildren, newChildren) {
    let oldStartIndex = 0;
    let oldEndInex = oldChildren.length - 1;
    let oldStartVnode =  oldChildren[oldStartIndex];
    let oldEndVnode = oldChildren[oldEndInex];

    let newStartIndex = 0;
    let newEndIndex = newChildren.length - 1;
    let newStartVnode =  newChildren[newStartIndex];
    let newEndVnode = newChildren[newEndIndex];

    let map = makeIndexByKey(oldChildren);
    function makeIndexByKey(oldChildren) {
        let map = {};
        oldChildren.forEach((item, index) => {
            map[item.key] = index 
        });
        return map;
    }

    while(oldStartIndex <= oldEndInex && newStartIndex <= newEndIndex) {
        if(!oldStartVnode){
            oldStartVnode = oldChildren[++oldStartIndex]
        }else if(!oldEndVnode){
            oldEndVnode = oldChildren[--oldEndIndex];
        }else if(isSameVnode(oldStartVnode, newStartVnode)) {//新的头指针和旧的头指针相同，头指针加一
            patch(oldStartVnode, newStartVnode);
            oldStartVnode = oldChildren[++oldStartIndex];
            newStartVnode = newChildren[++newStartIndex];
        }else if(isSameVnode(oldEndVnode, newEndVnode)) {//新的尾指针指针和旧的尾指针相同，尾指针减一
            patch(oldEndVnode, newEndVnode);
            oldEndVnode = oldChildren[--oldEndInex];
            newEndVnode = newChildren[--newEndIndex];
        }else if(isSameVnode(oldStartVnode, newEndVnode)) {//旧的头指针和新的尾指针相同，旧的头指针加一，新的尾指针减一，将旧的头指针元素移动到旧的尾指针的元素后面
            patch(oldStartVnode, newEndVnode);
            parent.insertBefore(oldStartVnode.el,oldEndVnode.el.nextSibling);
            oldStartVnode = oldChildren[++oldStartIndex];
            newEndVnode = newChildren[--newEndIndex];
        }else if(isSameVnode(oldEndVnode, newStartVnode)) {//旧的尾指针和新的头指针相同，旧的尾指针减一，新的头指针加一，将旧的尾指针元素移动到旧的头指针的元素前面
            patch(oldStartVnode, newEndVnode);
            parent.insertBefore(oldStartVnode.el,oldEndVnode.el.nextSibling);
            oldStartVnode = oldChildren[++oldStartIndex];
            newEndVnode = newChildren[--newEndIndex];
        }else {
            let moveIndex = map[newStartVnode.key];
            if(!moveIndex) {
                parent.insertBefore(createElm(newStartVnode),oldStartVnode.el);
            }else {
                let moveVnode = oldChildren[moveIndex];
                oldChildren[moveIndex] = undefined;
                patch(moveVnode,newStartVnode); // 如果找到了 需要两个虚拟节点比对
                parent.insertBefore(moveVnode.el,oldStartVnode.el)
            }
            newStartVnode = newChildren[++newStartIndex];
        }
    }
    for(let i = oldStartIndex; i <= oldEndInex; i++) {
        let child  = oldChildren[i];
        if(child) {
            parent.removeChild(child.el)
        }
    }

    for(let i = newStartIndex; i <= newEndIndex; i++) {
        // 向前插入 向后插入
        // 看一眼newEndIndex 下一个节点有没有值
        let nextEle = newChildren[newEndIndex+1] == null? null:  newChildren[newEndIndex+1].el;
        // appendChild 和 insertBefore 也可以进行合并
        // 如果insertBefore 传入null 等价于appendChild
        parent.insertBefore(createElm(newChildren[i]),nextEle)
        // parent.appendChild(createElm(newChildren[i]));
    }
}


export function createComponent(vnode) {
    let i = vnode.data;
    if((i = i.hook) && (i = i.init)){
        i(vnode)
    }
    if(vnode.componentInstance){ // 如果虚拟节点上有组件的实例说明当前这个vode是组件
        return true;
    }
    return false
}

export function createElm(vnode) { // 根据虚拟节点创建真实的节点
    let { tag, children, key, data, text, vm } = vnode;
    if(typeof tag === 'string'){
        // 可能是组件
        if(createComponent(vnode)){
            // 如果返回true 说明这个虚拟节点是组件
            // 如果是组件，就将组件渲染后的真实元素给我
            return vnode.componentInstance.$el
        }
        vnode.el =  document.createElement(tag); // 用vue的指令时 可以通过vnode拿到真实dom
        updateProperties(vnode);
        children.forEach(child=>{ // 如果有儿子节点，就进行递归操作
           vnode.el.appendChild(createElm(child))
        })
    }else{
        vnode.el = document.createTextNode(text)
    }

    return vnode.el;
}
function updateProperties(vnode, oldProps = {}){
    let newProps = vnode.data || {}; // 属性
    let el = vnode.el; // dom元素
    for(let key in oldProps) {
        if (!newProps[key]) {
            el.removeAttribute(key);
        }
    }

    let newStyle = newProps.style || {}; // {color:blue}
    let oldStyle = oldProps.style || {} // {background:red}
    for (let key in oldStyle) { // 判断样式根据 新老先比对一下
        if (!newStyle[key]) {
            el.style[key] = ''
        }
    }
    for(let key in newProps){
        if(key == 'style'){
            for(let styleName in newProps.style){
                el.style[styleName] = newProps.style[styleName]
            }
        }else if(key === 'class'){
            el.className = newProps.class
        }else{
            el.setAttribute(key,newProps[key]);
        }
    }
}