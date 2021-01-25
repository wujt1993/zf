const createHashHistory = function() {
    let listeners = [];
    let state;
    let action;
    let historyIndex = -1;
    let historyStack = [];
    const listen = function(listener) {
        listeners.push(listener);
        return () => {
            let idx = listeners.indexOf(listener);
            listeners.splice(idx, 1)
        }
    }
    window.addEventListener("hashchange", ()=> {
        let pathname = window.location.hash.slice(1);
        Object.assign(history, {action, location:{pathname, state}});
        if(action === 'PUSH') {
            historyStack[++historyIndex] = history.location
        }
        listeners.forEach(listener=>listener(history.location))
    })
    function go(n) {
        action = 'POP';
        historyIndex += n;
        let nextLocation = historyStack[historyIndex];
        state = nextLocation.state;
        window.location.hash = nextLocation.pathname;
    }

    function goBack() {
        go(-1);
    }

    function goForward() {
        go(1);
    }
    function push(pathname, newState) {
        action = 'PUSH'
        if(typeof pathname === 'object') {
            state = pathname.state;
            pathname = pathname.pathname
        }else {
            state = newState;
        }
        window.location.hash = pathname;
    }
    let history = {
        action: 'POP',
        listen,
        go,
        goBack,
        goForward,
        push,
        location: {pathname: '/', state: undefined}
    }

    if(window.location.hash) {
        Object.assign(history, {action: 'POP', location:{pathname:window.location.hash.slice(1), state}});
        historyStack[++historyIndex] = history.location;
    }else {
        window.location.hash = "/"
    }
    return history;
}

export default createHashHistory;