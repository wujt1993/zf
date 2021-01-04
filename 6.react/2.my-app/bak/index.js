import React from  './react';
import ReactDOM from  './react-dom';

let element = <h1 id="title" style={{color: 'red', fontSize: '30px'}}><span>hello</span> world</h1>;
// console.log(element);
ReactDOM.render(element , document.getElementById("root"));
/**
 * react 17 后，转换jsx不再使用React.createElement(), 使用jsx()方法
 * 如果17后还想使用React.createElement() 转换jsx， 则需要设置环境变量 DISABLE_NEW_JSX_TRANSFORM=true
 */
// let element2 = React.createElement('h1', {
//         id: 'title',
//         style: {
//             color: 'red', 
//             fontSize: '30px'
//         }
//     }, 
//     React.createElement('span',{},'hello'
//     ) ,
//     ' world'
// )
// {
//     type: 'h1',
//     props: {
//         id: 'title',
//         style: {
//             color: 'red',
//             fontSize: '30px',
//         },
//         children: [
//             {
//                 type: 'span',
//                 props: {
//                     children: 'hello'
//                 }
//             },
//             ' world'
//         ]
//     }
// }

