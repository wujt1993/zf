import RouterContext from '../react-router/router-context';
import React from 'react';
import { matchPath } from '../react-router';
import { Link, Route } from './';
function NavLink(props) {
    let {
        to,
        className: classNameProp = "",
        style: styleProp = {},
        activeClassName = "active",
        activeStyle={},
        children,
        exact 
    } = props;
    return (
        <Route path={to} exact={exact} children={
             (routeProps) =>{
                let match = routeProps.match;
                let className =match?joinClassnames(classNameProp,activeClassName):classNameProp;
                let style = match?{...styleProp,...activeStyle}:styleProp;
                let linkProps = {
                    className,
                    style,
                    to,
                    children
                }
                return <Link {...linkProps}/>;
            }
        }/>
    )
}
function NavLink2(props) {
    let context = React.useContext(RouterContext);
    let {pathname} = context.location;
    let {
        to,
        className: classNameProp = "",
        style: styleProp = {},
        activeClassName = "active",
        activeStyle={},
        children,
        exact 
    } = props;
    let isActive = matchPath(pathname,{path:to,exact});
    let className = isActive ? joinClassnames(classNameProp,activeClassName):classNameProp;
    let style = isActive ? {...styleProp, ...activeStyle} : styleProp;
    let linkPorps = {
        className,
        style,
        children,
        to
    }
    return (
        <Link {...linkPorps}></Link>
    )
}

function joinClassnames(...className) {
    return className.filter(name=>name).join(" ");
}

export default NavLink;