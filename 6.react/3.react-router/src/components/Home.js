
const Home = (props) => {
    console.log("home", props)
    return (
        <div>
            home 
            <button onClick={()=>props.history.push("/user", {title:'user'})}>前往user</button>
            <button onClick={()=>props.history.push({pathname:"/profile",state:{title:'profile'}})}>前往profile</button>
        </div>
    )
}

export default Home