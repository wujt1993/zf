import createRouteMap from "./create-route-map";
import { createRoute } from "./history/base";

export default function createMatcher(routes) {
    
    let {pathMap} = createRouteMap(routes);//初始化


    function addRoutes(routes) {
        createRouteMap(routes, pathMap); // 动态添加路由
    }
    function match(path) {
        let record = pathMap[path];
        
        return createRoute(record,{ // {path:/,matched:[{},{}]}
            path
        })
    }
    return {
        addRoutes,
        match
    }
}