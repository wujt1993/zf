import React from './react';
import ReactDOM from './react-dom';

class Counter extends React.Component {

    state = {
        list: []
    }
    ulRef = React.createRef();

    getSnapshotBeforeUpdate() {
        return this.ulRef.current.clientHeight + Math.random();
    }
    componentDidUpdate(prevProps, prevState, height) {
        console.log('ul高度本次添加了', (this.ulRef.current.scrollHeight - height) + 'px');
    }
    componentDidMount() {
        setInterval(()=>{
            let list = this.state.list;
            this.setState({
                list: [...list, list.length]
            })
        }, 2000)
    }
    render() {
        return(
            <ul ref={this.ulRef}>
                {this.state.list.map((item, index) => {
                    return <li key={index}>{item}</li>
                })}
            </ul>
        )
    }
}


let element = <Counter></Counter>
ReactDOM.render(element, document.getElementById("root"))