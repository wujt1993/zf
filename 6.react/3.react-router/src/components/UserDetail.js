import userAPI from "../util/user-api";

function UserDetail(props) {
    console.log(props)
    let user = props.history.state;
    if(!user) {
        user = userAPI.find(props.match.params.id);
    }
    return (
        <div>
            <h1>id: {user.id}</h1>
            <h1>name: {user.username}</h1>
        </div>
    )
}

export default UserDetail;