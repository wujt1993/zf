import React from 'react';
import userAPI from '../util/user-api'
class UserAdd extends React.Component {
    userRef = React.createRef()
    onSubmit(event) {
        event.preventDefault();
        let user = {id: Date.now() + '', username: this.userRef.current.value};
        userAPI.add(user);
        this.props.history.push("/user/list")
    }
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <input ref={this.userRef}></input>
                <button type="submit">添加</button>
            </form>
        )
    }
}

export default UserAdd;