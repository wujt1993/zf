import { Redirect, Route } from "../react-router-dom";

function Protected(props) {
    let {path, component: RouteComponent} = props;
    return <Route path={path} render={
        (routeProps) => {
            return localStorage.getItem("login") ? <RouteComponent {...routeProps}></RouteComponent> : 
            <Redirect to={{pathname:'/login',state:{from:path}}}/>
        }
    } />

}

export default Protected;