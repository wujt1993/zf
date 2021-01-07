import React from './react';
import ReactDOM from './react-dom';

class Counter extends React.Component {
    static defaultProps = {
        name: 'zf'
    }
    
    constructor(props) {
        console.log("counter 1.constructor 初始化");
        super(props);
        this.state = {
            number: 0
        }
    }
    componentWillMount() {
        console.log("counter 2.componentWillMount组件将要挂载");
    }
    componentDidMount() {
        console.log("counter 4.componentDidMount 组件挂载完成");
    }
    shouldComponentUpdate(nextProps, nextState) {
        let flag = nextState.number % 2 === 0
        console.log("counter 5.shouldComponentUpdate 是否要更新组件",flag);
        return flag;
    }
    componentWillUpdate() {
        console.log("counter 6.componentWillUpdate 组件将要更新");
    }
    componentDidUpdate() {
        console.log("counter 7.componentDidUpdate 组件更新完成");
    }
    add = () => {
        this.setState({
            number: this.state.number + 1
        })
    }
    render() {
        console.log("counter 3.计算虚拟节点");
        return (
            <div id={'counter-' + this.state.number}>
                <h1>number: {this.state.number}</h1>
                <FnCom number={this.state.number}></FnCom>
                {this.state.number === 4 ? null : <ChildCounter number={this.state.number}></ChildCounter>}
                <button onClick={this.add}>add</button>
            </div>
        )
    }
}

class ChildCounter extends React.Component {
    componentWillMount() {
        console.log("ChildCounter 1.componentWillMount 组件将要渲染");
    }
    componentDidMount() {
        console.log("ChildCounter 3.componentDidMount 组件渲染完成");
    }
    componentWillReceiveProps(newProps) {
        console.log("ChildCounter 4.componentWillReceiveProps 父组件数据更新");
    }
    shouldComponentUpdate(nextProps, nextState) {
        let flag = nextProps.number % 3 === 0
        console.log("ChildCounter 5.shouldComponentUpdate 是否要更新组件",flag);
        return flag;
    }
    componentWillUpdate() {
        console.log("ChildCounter 6.componentWillUpdate 组件将要更新");
    }
    componentDidUpdate() {
        console.log("ChildCounter 7.componentDidUpdate 组件更新完成");
    }
    componentWillUnmount() {
        console.log("ChildCounter 8.componentWillUnmount 组件已销毁");
    }
    render() {
        console.log("ChildCounter 2.render 计算虚拟节点");
        return (
            <div>
                ChildCounter: {this.props.number}
            </div>
        )
    }
}

function FnCom(props) {
    return <div>fn:{props.number}</div>
}

let element = <Counter></Counter>
ReactDOM.render(element, document.getElementById("root"))