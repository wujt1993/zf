export default function createRouteMap(routes,oldPathMap){
    let pathMap = oldPathMap || {};
    routes.forEach(route => {
        addRouteRecord(route, pathMap, null);
    });
    return {
        pathMap
    }
}

function addRouteRecord(route, pathMap, parent) {
    let path = parent ? parent.path + "/" + route.path : route.path;
    let record = {
        path,
        parent,
        name: route.name,
        component: route.component,
        params: route.params || {},
        props: route.props,
        meta:route.meta
    }
    pathMap[path] = record;
    if(route.children) {
        route.children.forEach(child => {
            addRouteRecord(child, pathMap, route);
        })
    }
}
