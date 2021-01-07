
import Component from './Component'
import { wrapToVdom } from './util';
function createElement(type, config, children) {
    if(config) {
        delete config.__self;
        delete config.__source;
    }

    let props = {...config};
    if(arguments.length > 3) {
        props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom)
    }else {
        props.children = wrapToVdom(children)
    }
    
    return {
        type,
        props
    }
}

const React = {
    createElement,
    Component
};
export default React;