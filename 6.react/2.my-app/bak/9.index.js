import React from './react';
import ReactDOM from './react-dom';

class Button extends React.Component{
    state = {name: '张三'}
    render() {
        return <button title={this.props.title} name={this.state.name}></button>
    }
}

const Wrap = Button => {
    
    return class NewButton extends Button{
        state = {number: 0}
        add = () => {
            this.setState({
                number :this.state.number + 1
            })
        }
        render() {
            let renderElement  = super.render();
            let newProps = {
                ...renderElement.props,
                ...this.state,
                onClick: this.add
            }
            return (
                React.cloneElement(
                    renderElement,
                    newProps,
                    <p>{this.state.number}</p>
                )
            )
        }
    }
}
let NewButton = Wrap(Button)
let element = <NewButton title="标题"></NewButton>
ReactDOM.render(element, document.getElementById("root"))