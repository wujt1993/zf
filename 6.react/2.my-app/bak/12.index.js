import React from './react';
import ReactDOM from './react-dom';
// function App(props) {
//     let [number, setNumber] = React.useState(0);
//     function delayAddNumber () {
//         setTimeout(()=>{
//             setNumber(number+1)//不会记录数据当前的信息，只会记录执行该操作时数据的信息
//             // setNumber(number => number+1);//会记录最新的值
//         },3000)
//     }
//     return (
//         <div>
//             <h1>{number}</h1>
//             <button onClick={()=>setNumber(number+1)}>加1</button>
//             <button onClick={()=>delayAddNumber()}>延迟三秒秒加1</button>
//         </div>
//     )
// }


function Child({data, handleClick}) {
    console.log("Child render");
    return <button onClick={handleClick}>{data.number}</button>
}

let MemoChild = React.memo(Child);
function App() {
    console.log("App render");
    let [name, setName] = React.useState('zf');
    let [number, setNumber] = React.useState(0);
    let data = React.useMemo(()=>({number}),[number]);
    let handleClick = React.useCallback(() => {setNumber(number+1)}, [number]) ;
    return (
        <div>
            <h1>{name}</h1>
            <input value={name} onChange={(event) => setName(event.target.value)} />
            <MemoChild data={data} handleClick={handleClick}></MemoChild>
        </div>   
    )
}
let element = <App></App>
ReactDOM.render(element, document.getElementById("root"))