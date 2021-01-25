import React from 'react';
import matchPath from './match-path';
import RouterContext from './router-context'
class Switch extends React.Component {
    static contextType = RouterContext
    render() {
        let {location} = this.context;
        let element, match;
        React.Children.forEach(this.props.children, child=> {
            if (!match && React.isValidElement(child)) {
                element = child;
                match = matchPath(location.pathname, child.props);
            }
        })
        return match ? React.cloneElement(element,{computedMatch: match }) : null;
    }
}

export default Switch;