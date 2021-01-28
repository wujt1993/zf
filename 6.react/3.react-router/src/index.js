import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Link, NavLink} from './react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import User from './components/User';
import Login from './components/Login';
import Protected from './components/Protected'

let element = (
    <Router>
        <ul style={{marignBottom: '12px', borderBottom: '1px solid #ccc', paddingBottom: '12px'}}>
            <li>
                <NavLink exact={true} to="/" activeStyle={{color:'#fff'}} className="strong" style={{textDecoration:'line-through'}}>首页</NavLink>
            </li>
            <li>
                <NavLink to="/user">user</NavLink>
            </li>
            <li>
                <Link to="/profile">profile</Link>
            </li>
            <li>
                <Link to="/login">login</Link>
            </li>
        </ul>
        <Switch>
            <Route exact={true} path="/" component={Home}></Route>
            <Route path="/user" component={User}></Route>
            <Protected path="/profile" component={Profile}></Protected>
            <Route path="/login" component={Login}></Route>
        </Switch>
    </Router>
);

ReactDOM.render(element, document.getElementById("root"));