const Home = function(props) {
    console.log('home', props);
    return (
    <div>
        Home
        <button onClick={()=>props.history.push({pathname: '/user', state:{title: 'user'}})}>前往user</button>
        <button onClick={()=>props.history.push('/profile', {title: 'profile'})}>前往profile</button>
    </div>);
}
export default Home;