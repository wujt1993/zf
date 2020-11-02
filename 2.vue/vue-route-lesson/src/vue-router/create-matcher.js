import createRouteMap from "./create-route-map";
import { createRoute } from "./history/base";


export default function createMatcher(routes) {
    let { pathMap } = createRouteMap(routes); 

    function addRoutes(routes) {
        createRouteMap(routes);
    }

    function match(path) {
        let record = pathMap[path];
        return createRoute(record, { // {path:/,matched:[{},{}]}
            path
        })
    }

    return {
        addRoutes,
        match
    }
}