export function createRoute(record, location) {
    let res = [];
    if(record) {
        while(record){
            res.unshift(record);
            record = record.parent;
        }
    }
    return{
        ...location,
        res
    }
}


export default class History{

    constructor(router) {
        this.router = router
        this.current = createRoute(null,{
            path: "/"
        });//{path:"", matchec:[]}
    }

    transitionTo(location, cb) {
        let route = this.router.match(location); // route = {path:'/about/a',matched:[{},{}]}
        console.log(route);
        cb && cb()
    }
}