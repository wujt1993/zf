import RouterLink from "./compontents/router-link";
import RouterView from "./compontents/router-view";

export function install(Vue, options) {

    //将父组件上的router赋值给子组件

    Vue.mixin({
        beforeCreate() {
            if(this.$options.router) {
                this._routerRoot = this;
                this._router = this.$options.router;
                this.$options.router.init(this); //将Vue实例 回传给router
                Vue.util.defineReactive(this, "_route", this._router.history.current);
            }else {
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
        },
    })

    Object.defineProperty(Vue.prototype, "$route", {
        get() {
            return this._routerRoot._route
        }
    })
    Object.defineProperty(Vue.prototype, "$router", {
        get() {
            return this._routerRoot._router
        }
    })

    Vue.component("router-link", RouterLink)
    Vue.component("router-view", RouterView)
    
}