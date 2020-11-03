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
        // 路由初始化
        // 初始化后 需要先根据路径做一次匹配，后续根据hash值的变化再次匹配
        const history= this.history; // history的实例 
        const setupListener = ()=>{ // 切片编程
            history.setupListener(); // 监听hash值变化
            // todo...
        }// history模式
        history.transitionTo(history.getCurrentLocation(),setupListener); // 跳转到哪里

        history.listen((route)=>{ // 改变了 响应式数据
            app._route = route;
        })
    }

    match(location) {
        return this.matcher.match(location)
    }


    push(location) {
        this.history.push(location)
    }

    
}

VueRouter.install = install;