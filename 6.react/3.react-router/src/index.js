import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from './react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import User from './components/User';

let element = (
    <Router>
        <Route exact={true} path="/" component={Home}></Route>
        <Route path="/user" component={User}></Route>
        <Route path="/profile" component={Profile}></Route>
    </Router>
);

ReactDOM.render(element, document.getElementById("root"));