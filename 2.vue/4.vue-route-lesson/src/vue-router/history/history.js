import History from "./base"

export default class BrowserHistory extends History{

    constructor(router) {
        super(router)
    }

    getCurrentPath() {
        return window.location.pathname;
    }

    setUpListener() {
        window.addEventListener("popstate",()=>{
            this.transitionTo(getHash());
        })
    }

    push(location) {
        this.transitionTo(location,()=>{
            window.history.pushState({},null,location);
        }); // 可以去匹配视图
    }
}