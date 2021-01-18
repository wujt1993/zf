import React from 'react';
import matchPath from './matchPath';
import RouterContext from './router-context'
class Route extends React.Component {
    static contextType = RouterContext
    render() {
        let {location, history} = this.context;
        let {component:RouterComponent, computedMatch} = this.props;
        let element = null;
        let match = computedMatch ? computedMatch : matchPath(location.pathname, this.props);
        let routerProps = {history, location}
        if(match) {
            routerProps.match = match;
            element = <RouterComponent {...routerProps}/>;
        }
        return element;
    }
}
export default Route;