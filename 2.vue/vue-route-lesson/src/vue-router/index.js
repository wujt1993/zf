import createMatcher from "./create-matcher";
import HashHistory from "./history/hash";
import BrowserHistory from "./history/history";
import { install } from "./install";

export default class VueRouter {
    constructor(options) {
        //返回matcher 、 addRoutes
        this.matcher = createMatcher(options.routes || []);

        switch(options.mode) {
            case 'hash':
                this.history = new HashHistory(this);
                break
            case 'history':
                this.history = new BrowserHistory(this); 
        }
    }

    init(app) {
        const history = this.history;
        const setupListener = () =>{
            history.setupListener()
        }
        history.transitionTo(history.getCurrentLocation(), setupListener)
    }

    match(location) {
        return this.matcher.match(location)
    }
}

VueRouter.install = install;