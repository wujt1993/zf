import React from 'react';
import matchPath from './match-path';
import RouterContext from './router-context'

class Route extends React.Component {
    static contextType = RouterContext
    render() {
        const { location, history } = this.context;
        const { component: RouteComponent, computedMatch, render } = this.props;
        let element = null;
        let match = computedMatch ? computedMatch : matchPath(location.pathname, this.props);
        let routeProps = { history, location }
        if (match) {
            routeProps.match = match;
            if (RouteComponent) {
                element = <RouteComponent {...routeProps} />
            } else if (render) {
                element = render(routeProps);
            } else {
                element = null;
            }
        } else {
            element = null;
        }
        return element;
    }
}

export default Route;