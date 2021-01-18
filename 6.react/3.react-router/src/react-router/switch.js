import React from  'react';
import RouterContext from "./router-context";
import matchPath from './matchPath'
class Switch extends React.Component{
    static contextType = RouterContext;
    render() {
        const { location } = this.context;
        let match, element;
        React.Children.forEach(this.props.children, child=>{
            if(!match && React.isValidElement(child)) {
                element = child;
                match = matchPath(location.pathname, child.props);
            }
        })
        return match ? React.cloneElement(element,{computedMatch: match}) : null;
    }
}

export default Switch;
