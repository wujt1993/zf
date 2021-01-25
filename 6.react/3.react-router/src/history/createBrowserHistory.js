
function createBrowserHistory() {
    let globalHistory = window.history;
    let listeners = [];
    const listen = function(listener) {
        listeners.push(listener);
        return () => {
            listeners.filter(l => listener !== l)
        }
    }

    const notify = function(newHistory) {
        Object.assign(history,newHistory);
        history.length = globalHistory.length;
        listeners.forEach(l=>l(history.location));
    }
    const push = function(pathname, state) {
        const action = 'PUSH';
        if(typeof pathname === 'object') {
            state = pathname.state;
            pathname = pathname.pathname;
        }
        globalHistory.pushState(state, null, pathname);
        let location = {state, pathname};
        notify({location, action});
    } 
    const go = function(n) {
        globalHistory.go(n)
    }
    const goBack = function() {
        go(-1)
    }
    const goForward = function() {
        go(1)
    }
    window.onpopstate = () => {
        notify({action:"POP",location: {pathname: window.location.pathname, state: globalHistory.state}})
    }
    let history = {
        action: 'POP',
        listen,
        push,
        go,
        goBack,
        goForward,
        location: {pathname: window.location.pathname, state: globalHistory.state}
    }
    return history;
}
export default createBrowserHistory;