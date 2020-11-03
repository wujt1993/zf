

export default function createRouteMap(routes, oldPathMap) {
    let pathMap = oldPathMap || {};
    routes.forEach(route => {
        addRouteRecord(route,pathMap, null)
    });
    return{pathMap}
}

function addRouteRecord(route, pathMap, parent) {
    let path = parent ? parent.path + "/" + route.path : route.path;
    
    let record = {
        path,
        parent,
        component: route.component,
        parmas: route.parmas || {},
        meta: route.meta,
        props: route.props,
        name: route.name
    }

    if(!pathMap[path]) {
        pathMap[path] = record;
    }
    if(route.children) {
        route.children.forEach(child => {
            addRouteRecord(child, pathMap, route)
        })
    }
}