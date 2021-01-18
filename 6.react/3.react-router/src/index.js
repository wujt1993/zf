import React from  'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from './react-router-dom'
import Home from './components/Home'
import User from './components/User'
import Profile from './components/Profile'

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={Home}></Route>
                <Route exact={true} path="/user" component={User}></Route>
                <Route exact={true} path="/profile" component={Profile}></Route>
            </Switch>
            
        </BrowserRouter>
    )
}
let element = <App></App>
ReactDOM.render(element, document.getElementById('root'))