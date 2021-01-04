import React from './react';
import ReactDOM from './react-dom';

let element = <h1 id="title" style={{color: 'red', background: 'green'}}>hello <span>world</span></h1>;
/**
 * react 17 之后，不会再用React.createElement 转换jsx，用jsx()代替
 * set DISABLE_NEW_JSX_TRANSFORM=true 禁止jsx薪属性，则会调用 React.createElement 转换jsx
 * {
 *      type: 'h1',
 *      props: {
 *          id: 'title',
 *          style: {
 *              color: 'red', 
 *              background: 'green'
 *          },
 *          children: [
 *               'hello',
 *              {
 *                  type:'span',
 *                  props: {
 *                      children: 'world'
 *                  }
 *                  
 *              }
 *          ]
 *      }
 * }
 */
/**
 * <h1 id="title" style={{color: 'red', background: 'green'}}>hello <span>world</span></h1>;
 * createElement(
 *  'h1',
 *  {
 *      style: {
 *          color: 'red', 
 *          background: 'green'
 *      },
 *      id: 'title'
 *  },
 *  'hello',
 *  createElement(
 *      'span',
 *      {
 *          
 *      },
 *      'world'
 *  )
 * )
 */
ReactDOM.render(element, document.getElementById("root"))