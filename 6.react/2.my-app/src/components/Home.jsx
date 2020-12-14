import React, { Component } from 'react';
import News from './News' 
import Phone from './Phone' 
import Img2 from '../assets/img/logo.png';
const Img1 = require('../assets/img/logo.png').default;

export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state={
            text: '默认值'
        }
    }
    fn=(text)=> {
        this.setState({
            text
        })
    }
    render() {
        return (
            <div>
                <h1>我是第一个组件</h1>
                <div>
                    图片引用
                    <img src="/logo192.png"/>
                    <img src={Img1} alt="11"/>
                    <img src={Img2} alt=""/>
                </div>
                <h1>组件</h1>
                <div>
                    {this.state.text}
                    <News text='组件间传值' nFn={this.fn}></News>
                    <Phone></Phone>
                </div>
            </div>
        )
    }
}
