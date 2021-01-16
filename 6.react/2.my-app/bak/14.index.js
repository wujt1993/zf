import React from './react';
import ReactDOM from './react-dom';



const App = ()=>{
    const ref = React.useRef();
    React.useEffect(()=>{
        ref.current.style.WebkitTransform = `translate(500px)`;
        ref.current.style.transition  = `all 500ms`;
    });//ui渲染之后，宏任务
    // React.useLayoutEffect(()=>{
    //     ref.current.style.WebkitTransform = `translate(500px)`;
    //     ref.current.style.transition  = `all 500ms`;
    // });//ui渲染前执行，微任务
    let style = {
        width:'100px',
        height:'100px',
        backgroundColor:'red'
    }
    return (
        <div style={style} ref={ref}>我是内容</div>
    )
}


// function App() {
//     console.log("app render")
//     let [number, setNumber] = React.useState(0);
//     React.useEffect(()=>{
//         console.log("开启一个定时器");
//         const $timer = setInterval(()=>setNumber(number => number+1), 1000)
//         return () =>{
//             console.log("销毁老的定时器");
//             clearInterval($timer);
//         }
//     })

//     return (
//         <p>{number}</p>
//     )
// }
let element = <App></App>
ReactDOM.render(element, document.getElementById("root"))