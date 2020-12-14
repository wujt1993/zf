import React, { Component } from 'react'
import pubsub from 'pubsub-js'
export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state={
            price: 1000
        }
        pubsub.subscribe("add",(msg, data)=>{
            this.setState({
                price: data * 3
            })
        })
    }
    
    render() {
        return (
            <div>
                phone： {this.state.price}
            </div>
        )
    }
}
