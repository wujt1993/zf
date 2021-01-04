
import Component from './Component'
function createElement(type, config, children) {
    if(config) {
        delete config.__self;
        delete config.__source;
    }

    let props = {...config};
    if(arguments.length > 3) {
        children = Array.prototype.slice.call(arguments, 2)
    }
    props.children = children
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