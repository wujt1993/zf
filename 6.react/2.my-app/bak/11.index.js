import React from './react';
import ReactDOM from './react-dom';

class Counter extends React.Component {
    state = {
        number1: 0,
        number2: 0
    }

    addNumber1 = () => {
        this.setState({
            number1: this.state.number1 + 1
        })
    }

    addNumber2 = () => {
        this.setState({
            number2: this.state.number2 + 1
        })
    }

    render() {
        return(
            <div>
                <ChildCounter1 number={this.state.number1}></ChildCounter1>
                <ChildCounter2 number={this.state.number2}></ChildCounter2>
                <button onClick={this.addNumber1}>number1</button>
                <button onClick={this.addNumber2}>number2</button>
            </div>
        )
    }
}

class ChildCounter1 extends React.PureComponent {
    render() {
        console.log("ChildCounter1, render")
        return <div>{this.props.number}</div>
    }
}


class ChildCounter2 extends React.PureComponent {
   
    render() {
        console.log("ChildCounter2, render")
        return <div>{this.props.number}</div>
    }
}


let element = <Counter></Counter>
ReactDOM.render(element, document.getElementById("root"))