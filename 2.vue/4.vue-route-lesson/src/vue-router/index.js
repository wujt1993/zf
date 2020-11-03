import createMatcher from "./create-matcher";
import HashHistory from "./history/hash";
import BrowserHistory from "./history/history";
import { install } from "./install";

export default class VueRouter {
    constructor(options) {
        //返回addRoutes 和 match
        this.matcher = createMatcher(options.routes || []);
        this.beforeEachHooks = []
        if(options.mode == "history") {
            this.history = new BrowserHistory(this);
        }else {
            this.history = new HashHistory(this);
        }
    }

    init(app) {
        const history = this.history;
        const setUpListener = () =>{
            history.setUpListener()
        }
        history.transitionTo(history.getCurrentPath(),setUpListener)

        history.listen((route)=>{
            app._route = route
        })
    }

    match(location) {
        return this.matcher.match(location)
    }

    push(location) {
        this.history.push(location)
    }

    beforeEach(hook) {
        this.beforeEachHooks.push(hook)
    }
}

VueRouter.install = install

