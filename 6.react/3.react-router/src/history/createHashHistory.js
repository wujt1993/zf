

function createHashHistory() {
    let state;
    let listeners = [];
    let historyStack = [];
    let historyIndex = -1;
    let action;
    function listen(listener) {
        listeners.push(listener);
        return () => {
            let idx = listeners.indexOf(listener);
            listeners.splice(idx, 1);
        }
    }
    window.addEventListener("hashchange", () => {
        let pathname = window.location.hash.slice(1)
        Object.assign(history, {action, location: {pathname, state}});
        if(action === 'PUSH') {
            historyStack[++historyIndex] = history.location;
        }
        listeners.forEach(listener => listener(history.location));
    })
    function push(pathname, nextState) {
        action = "PUSH";
        if(typeof pathname === 'object') {
            state = pathname.state;
            pathname = pathname.pathname
        }else {
            state = nextState;
        }
        window.location.hash = pathname;
    }
    function go(n) {
        action = "POP";
        historyIndex += n;
        let location = historyStack[historyIndex];
        state = location.state;
        window.location.hash = location.pathname;
    }

    function goBack() {
        go(-1);
    }
    function goForward() {
        go(1);
    }
    let history = {
        action: 'POP',
        listen,
        push,
        go,
        goBack,
        goForward,
        location: {pathname: window.location.hash.slice(1) , state}
    };
    if(window.location.hash) {
        historyStack[++historyIndex] = history.location;
    }else {
        window.location.hash = '/'
    }
    
    return history;
}

export default createHashHistory;