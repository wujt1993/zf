
import {Component, PureComponent} from './Component'
import { wrapToVdom } from './util';
import {useState,useMemo,useCallback,useReducer,useContext} from  './react-dom'
function createElement(type, config, children) {
    let ref;
    if(config) {
        delete config.__self;
        delete config.__source;
        ref = config.ref;
        delete config.ref;
    }

    let props = {...config};
    if(arguments.length > 3) {
        props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom)
    }else {
        props.children = wrapToVdom(children)
    }
    
    return {
        type,
        props,
        ref
    }
}
function createRef() {
    return {
        current: null
    }
}
function createContext(initialValue={}) {
    let context = {
        Provider, 
        Consumer
    }
    context._currentValue = context._currentValue || initialValue;
    function Provider(props){
        Object.assign(context._currentValue,props.value);
        return props.children
    }

    function Consumer(props) {
        return props.children(context._currentValue)
    }
    return context
}

function cloneElement(element, newProps, ...newChildren) {
    let oldChildren = element.props && element.props.children;
    let children = [...(Array.isArray(oldChildren) ? oldChildren : [oldChildren]), newChildren].filter(item=>item!==undefined).map(wrapToVdom);
    if(children.length === 1) children = children[0];
    let props = {...element.props, ...newProps,children};
    return {...element, props}
}

function memo(FunctionComponent) {
    return class newComponent extends PureComponent{
        render() {
            return FunctionComponent(this.props);
            // return <FunctionComponent {...this.props}></FunctionComponent>
        }
    }
}
const React = {
    createElement,
    Component,
    PureComponent,
    createRef,
    createContext,
    cloneElement,
    useState,
    memo,
    useMemo,
    useCallback,
    useReducer,
    useContext
};
export default React;