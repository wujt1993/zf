import React from './react';
import ReactDOM from './react-dom';

class Counter extends React.Component {

    static defaultProps = {
        name: 'zf'
    }
    constructor(props) {
        console.log("counter 1.constructor")
        super(props);
        this.state = {
            number: 0
        }
    }

    componentWillMount() {
        console.log("counter 2.componentWillMount 组件将要挂载")
    }

    componentDidMount() {
        console.log("counter 4.componentDidMount 组件挂载完成")
    }

    shouldComponentUpdate(nextProps, nextState) {
        let flag = nextState.number % 2 === 0;
        console.log("counter 5.shouldComponentUpdate 是否更新组件", flag);
        return flag
    }

    componentWillUpdate() {
        console.log("counter 6.componentWillUpdate 组件将要更新")
    }

    componentDidUpdate() {
        console.log("counter 7.componentDidUpdate 组件更新完成")
    }


    add = () => {
        this.setState({
            number: this.state.number + 1
        })
    }

    render() {
        console.log("counter 3.render 计算虚拟节点 vdom")
        return (
            <div>
                <h1>number: {this.state.number}</h1>
                <button onClick={this.add}>add</button>
            </div>
        )
    }
}

let element = <Counter></Counter>

ReactDOM.render(element, document.getElementById("root"))