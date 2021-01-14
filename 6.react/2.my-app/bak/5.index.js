import React from './react';
import ReactDOM from './react-dom';

class Counter extends React.Component {
    static defaultProps = {
        name: 'zf'
    }
    constructor(props) {
        super(props);
        this.state = {
            number: 0
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        return true
    }

    add = () => {
        this.setState({
            number: this.state.number + 1
        })
    }
    render() {
        return (
            <div id={'counter-' + this.state.number}>
                <h1>number: {this.state.number}</h1>
                <ChildCounter count={this.state.number}></ChildCounter>
                <button onClick={this.add}>add</button>
            </div>
        )
    }
}

class ChildCounter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'child',
            number: 0
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        return true
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps.count, prevState.number)
        if(nextProps.count === 0) return {number: 10}
        if(nextProps.count % 2 === 0) {
            return {
                number: nextProps.count * 2
            }
        }else if(nextProps.count % 3 === 0) {
            return {
                number: nextProps.count * 3
            }
        }
        return null
    }
    render() {
        return (
            <div >{this.state.name}: {this.state.number}</div>
        )
    }
}
let element = <Counter></Counter>
ReactDOM.render(element, document.getElementById("root"))