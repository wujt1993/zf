import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from './react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import User from './components/User';

let element = (
    <Router>
        <Switch>
            <Route exact={true} path="/" component={Home}></Route>
            <Route exact={true} path="/" component={User}></Route>
            <Route path="/user" component={User}></Route>
            <Route path="/profile" component={Profile}></Route>
        </Switch>
    </Router>
);

ReactDOM.render(element, document.getElementById("root"));