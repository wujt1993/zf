import userAPI from "../util/user-api";

function UserList(props) {
    let users = userAPI.list();
    let element = <ul>
        {
            users.map((user)=> {
                return <li key={user.id} onClick={()=>props.history.push('/user/detail/' + user.id, user)}>{user.username}</li>
            })
        }
    </ul>
    return element
}

export default UserList;