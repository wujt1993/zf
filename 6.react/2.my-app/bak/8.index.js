import React from 'react';
import ReactDOM from 'react-dom';

const LoadingMessage = message => Old => {
    return class NewComponent extends React.Component {
        show = () =>{
            let div = document.createElement("div");
            div.id ="loading";
            div.innerHTML = `<p>${message}</p>`
            document.body.appendChild(div);
        }

        hide = () => {
            document.getElementById('loading').remove();
        }
        render() {
            let extraProps = {show: this.show, hide:this.hide}
            return (
                <Old {...this.props} {...extraProps}></Old>
            )
        }
    }
}

// @LoadingMessage("加载中。。。")
class Hello extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <button onClick={this.props.show}>显示</button>
                <button onClick={this.props.hide}>隐藏</button>
            </div>
        )
    }
}

let NewHello = LoadingMessage("加载中。。。")(Hello);

let element = <NewHello title="标题"></NewHello>
// let element = <Hello title="标题"></Hello>
ReactDOM.render(element, document.getElementById("root"))