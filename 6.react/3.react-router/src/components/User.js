import {Link, Switch, Route} from '../react-router-dom';
import UserList from './UserList';
import UserAdd from './UserAdd';
import UserDetail from './UserDetail';
const User = function(props) {
    console.log('user', props);
    return (
    <div>
        <ul>
            <li>
                <Link to="/user/add">添加用户</Link>
            </li>
            <li>
                <Link to="/user/list">用户列表</Link>
            </li>
        </ul>
        <Switch>
            <Route path="/user/add" component={UserAdd}></Route>
            <Route path="/user/list" component={UserList}></Route>
            <Route path="/user/detail/:id" component={UserDetail}></Route>
        </Switch>
    </div>);
}
export default User;