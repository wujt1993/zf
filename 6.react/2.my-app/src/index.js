import React from './react';
import ReactDOM from './react-dom';

function Child(props, childRef) {
    const inputRef = React.createRef()
    React.useImperativeHandle(childRef,()=>({
        focus(){ inputRef.current.focus()}
    }))
    return <input ref={inputRef} />
}
let NewChild = React.forwardRef(Child);
function App() {
    let childRef = React.createRef();
    const handleClick = () => {
        childRef.current.focus();
        // childRef.current.remove()
    }
    return(
        <div>
            <NewChild ref={childRef}></NewChild>
            <button onClick={handleClick}>获取焦点</button>
        </div>
    )
}

let element = <App></App>
ReactDOM.render(element, document.getElementById("root"))