import React, { Component } from 'react';
import pubsub from 'pubsub-js';
export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 1
        }
    }

    setPrice() {
        pubsub.publish("add", Math.random() * 1000)
    }

    addFn() {
        this.setState({
            num: this.state.num + 1
        })
    }
    render() {
        return (
            <div>
                <div>
                    new ------------- home:{this.props.text} ---------------- state: {this.state.num}
                    <button onClick={()=>{this.addFn()}}>点击</button>
                </div>
                <p>
                    <button onClick={this.props.nFn.bind(this, 'news组件的值')}>点我进行数据的发送</button>
                </p>
                <p>
                   通过pubsub-js进行同级组件间传值
                   <button onClick={()=>{this.setPrice()}}>改变phone的值</button> 
                </p>
            </div>
        )
    }
}