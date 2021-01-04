import React from './react';
import ReactDOM from './react-dom';
// import {updateQueue} from './Component'

// function FunCom(props) {
//     return( 
//         <div>
//             <h1>hello {props.name}</h1>
//             {props.children}
//         </div>
//     )
// }
// let element = <FunCom name='react'>
//     <h2 style={{color: "red"}}>hhh</h2>
// </FunCom>

class ClassCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            tip: 'hhhh'
        }
    }
    
    add = () =>{
        console.log('hhhhhhhh')
        // updateQueue.isBatchingUpdate = true
        //事件批处理
        this.setState({
            number: this.state.number + 1
        }, ()=>{
            console.log('callback1', this.state.number)
        });
        console.log('1------------', this.state.number)
        this.setState({
            number: this.state.number + 1
        }, ()=>{
            console.log('callback2', this.state.number)
        })
        console.log('2------------', this.state.number)
        setTimeout(() =>{
            //跳出react事件将不再进行批处理

            this.setState({
                number: this.state.number + 1
            }, ()=>{
                console.log('callback3', this.state.number)
            });
            console.log('3------------', this.state.number)
            this.setState({
                number: this.state.number + 1
            }, ()=>{
                console.log('callback4', this.state.number)
                
            })
            console.log('4------------', this.state.number)
        },1000)
        // updateQueue.batchUpdate()
    }

    render() {
        return (
            <div>
                <h1>hello {this.props.name} {}</h1>
                count: {this.state.number} -{'>'} {this.state.tip} 
                <h3>
                    <button onClick={this.add}>add</button>
                </h3>
            </div>
        )
    }
}

let element = <ClassCom name='react'></ClassCom>

ReactDOM.render(element, document.getElementById("root"))