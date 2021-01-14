import React from './react';
import ReactDOM from './react-dom';

// class MouseTrack extends React.Component {

//     state = {x: 0, y: 0}
//     mouseMove = (event) => {
//         this.setState({
//             x: event.clientX,
//             y: event.clientY
//         })
//     }
//     render() {
//         return(
//             <div onMouseMove={this.mouseMove}>
//                 当前鼠标的位置
//                 <br/>
//                 x: {this.state.x}
//                 <br/>
//                 y: {this.state.y}
//             </div>
//         )
//     }
// }
// let element = <MouseTrack></MouseTrack>



// class MouseTrack extends React.Component {
//     state = {x: 0, y: 0}
//     mouseMove = (event) => {
//         this.setState({
//             x: event.clientX,
//             y: event.clientY
//         })
//     }
//     render() {
//         return(
//             <div onMouseMove={this.mouseMove}>
//                 {this.props.children(this.state)}
//             </div>
//         )
//     }
// }
// let element = <MouseTrack>
//     {
//         (props) => (
//             <div>
//                  当前鼠标的位置
//                 <br/>
//                 x: {props.x}
//                 <br/>
//                 y: {props.y}
//             </div>
//         )
//     }
// </MouseTrack>


class MouseTrack extends React.Component {

    state = { x: 0, y: 0 }
    mouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }
    render() {
        return (
            <div onMouseMove={this.mouseMove}>
                {this.props.render(this.state)}
            </div>
        )
    }
}
let element = <MouseTrack render={
    params => (
        <div>
            当前鼠标的位置
                <br />
                x: {params.x}
            <br />
                y: {params.y}
        </div>
    )
}>
</MouseTrack>


ReactDOM.render(element, document.getElementById("root"))