const User = function(props) {
    console.log('user', props);
    return (
    <div>
        user
        <button onClick={()=>props.history.goBack()}>返回</button>
    </div>);
}
export default User;