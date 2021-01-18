

function createBrowserHistory() {
    let globalHistory = window.history;
    let listeners = [];
    let action;
    let state;
    function listen(listener) {
        listeners.push(listener);
        return () => {
            listeners.filter(item=>item !== listener);
        }
    }

    function push(pathname, nextState) {
        action = 'PUSH';
        if(typeof pathname === 'object') {
            state = pathname.state;
            pathname = pathname.pathname;
        }else {
            state = nextState;
        }
        globalHistory.pushState(state, null, pathname);
        let location = {pathname, state}
        setState({action, location});
    }
    function setState(newState) {
        Object.assign(history, newState);
        history.length = globalHistory.length;
        listeners.forEach(listener=> listener(history.location));
    }
    window.onpopstate = () => {
        action = 'POP';
        Object.assign(history, {action, location: {pathname:window.location.pathname, state: globalHistory.state}});
        listeners.forEach(listener=> listener(history.location));
    }
    function go(n) {
        globalHistory.go(n)
    }
    function goBack() {
        go(-1)
    }
    function goForward(n) {
        go(1)
    }
    let history = {
        action: 'POP',
        go,
        goBack,
        goForward,
        listen,
        push,
        location: {pathname: window.location.pathname, state: globalHistory.state}
    }

    return history;
}

export default createBrowserHistory;