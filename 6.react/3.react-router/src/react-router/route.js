import React from 'react';
import RouterContext from './router-context'

class Route extends React.Component {
    static contextType = RouterContext
    render() {
        const {location, history} = this.context;
        const {path, component:RouteComponent} = this.props;
        let element = null;
        let match = path === location.pathname;
        let routeProps = {history,location}
        if(match) {
            element = <RouteComponent {...routeProps}></RouteComponent>;
        }
        return element;
    }
}

export default Route;