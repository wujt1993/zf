import History from "./base";

function ensureslave() {
    if(window.location.hash) {
        return
    }
    window.location.hash = "/"
}

function getHash() {
    return window.location.hash.slice(1)
}

export default class HashHistory extends History {
    constructor(router) {
        super(router)
        ensureslave();
    }

    getCurrentPath() {
        return getHash();
    }

    setUpListener() {
        window.addEventListener("hashchange",()=>{
            this.transitionTo(getHash());
        })
    }
    push(location) {
        window.location.hash = location
    }
}