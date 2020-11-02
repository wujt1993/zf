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
        matched: res
    }
}


export default class History{

    constructor(router) {
        this.router = router
        this.current = createRoute(null,{
            path: "/"
        });//{path:"", matchec:[]}
    }

    transitionTo(location, onComplete) {

        let route = this.router.match(location); // route = {path:'/about/a',matched:[{},{}]}
        this.current = route;
        this.cb && this.cb(route);
        onComplete && onComplete()
    }

    listen(cb) {
        this.cb = cb
    }


}