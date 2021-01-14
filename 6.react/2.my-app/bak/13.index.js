import React from './react';
import ReactDOM from './react-dom';

let Context = React.createContext();

function Counter(props) {
    let {state, dispatch} = React.useContext(Context);
    return (
        <div>
            <h1>{state.number}</h1>
            <button onClick={() => dispatch({type:'add'})}>+</button>
            <button onClick={() => dispatch({type:'minus'})}>-</button>
        </div>
    )
}
function reducer(state={number: 0},action) {
    switch (action.type) {
        case 'add':
            return {number: state.number + 1};
        case 'minus':
            return {number: state.number - 1};   
        default:
            return state
    }
}
function App() {
    let [state, dispatch] = React.useReducer(reducer, {number: 0})
    return (
        <Context.Provider value={{state, dispatch}}>
            <Counter></Counter>
        </Context.Provider>
    )
}

let element = <App></App>
ReactDOM.render(element, document.getElementById("root"))