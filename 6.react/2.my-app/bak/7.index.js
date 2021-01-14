import React from './react';
import ReactDOM from './react-dom';
function getStyle(color){
    return {border:`5px solid ${color}`,padding:'5px',margin:'5px'}
}
let Context = React.createContext()

class Person extends React.Component {
    state = {color:"red"};
    changeColor = (color) => {
        this.setState({
            color: color
        })
    }
    render() {
        let contextVal = {
            color: this.state.color,
            changeColor: this.changeColor
        }
        return(
            <Context.Provider value={contextVal}>
                <div style={{...getStyle(this.state.color), width: '200px'}}>
                    person
                    <Head></Head>
                    <Body></Body>
                </div>
            </Context.Provider>
            
        )
        
    }
}

class Body extends React.Component {
    static contextType = Context;
    render() {
        return(
            <div style={{...getStyle(this.context.color)}}>
                Body
                <Hand></Hand>
            </div>
        )
        
    }
}
class Hand extends React.Component {
    static contextType = Context;
    render() {
        return(
            <div style={{...getStyle(this.context.color)}}>
                <button onClick={()=>this.context.changeColor('green')}>变绿</button>
                <button onClick={()=>this.context.changeColor('red')}>变红</button>
            </div>
        )
        
    }
}
class Head extends React.Component {
    static contextType = Context;
    render() {
        return(
            <div style={{...getStyle(this.context.color)}}>
                head
                <Eye></Eye>
            </div>
        )
        
    }
}

function Eye() {
    return (
        <Context.Consumer>
            {
                contextValue => (
                    <div style={{...getStyle(contextValue.color)}}>
                        <button onClick={()=>contextValue.changeColor('green')}>变绿</button>
                        <button onClick={()=>contextValue.changeColor('red')}>变红</button>
                    </div>
                )
            }
        </Context.Consumer>
    )
}
let element = <Person></Person>
ReactDOM.render(element, document.getElementById("root"))