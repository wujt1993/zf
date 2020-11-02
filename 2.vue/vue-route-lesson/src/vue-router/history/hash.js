import History from "./base";

function ensureslash() {
    if(window.location.hash) return;
    window.location.hash = "/";
}
function getHash() {
    return window.location.hash.slice(1);
}
export default class HashHistory extends History{

    constructor(router) {
        super(router)
        ensureslash()
    }
    setupListener() {
        window.addEventListener("hashchange", ()=> {
            this.transitionTo(this.getCurrentLocation())
        })
    }

    getCurrentLocation() {
        return getHash()
    }
}