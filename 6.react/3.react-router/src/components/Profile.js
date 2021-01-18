
const Profile = (props) => {
    console.log("Profile", props)
    return (
        <div>
            Profile 
            <button onClick={()=>props.history.goBack()}>返回</button>
        </div>
    )
}

export default Profile