/**
 * pitch function
 * 先获取到style样式，然后创建一个style标签，并插入到页面中
 * 什么时候会用到pitch loader
 * 当你想把两个最左侧的loader级联使用的时候
 */
let loaderUtils = require('loader-utils');
function normal(){
}
function normal3(inputSource){
    return `
            let style = document.createElement('style');
            style.innerHTML = ${JSON.stringify(inputSource)};
            document.head.appendChild(style);
      `;  
}
normal.pitch = function(remainingRequest,previousRequest,data){
    //剩下的loader!要加载的路径
    // !!只要行内样式
    // !!./loaders/css-loader.js!./src/index.css
    //console.log('loaderUtils.stringifyRequest(this,"!!"+remainingRequest)',
    //loaderUtils.stringifyRequest(this,"!!"+remainingRequest));
    let style =  `
     let style = document.createElement('style');
     style.innerHTML = require(${loaderUtils.stringifyRequest(this,"!!"+remainingRequest)}).toString();
     document.head.appendChild(style);
    `;  
    return style;
}
function normal2(inputSource){
    console.log('inputSource',inputSource);
    let module = {exports:{}};
    let result = eval(inputSource);
    return `
            let style = document.createElement('style');
            style.innerHTML = ${JSON.stringify(module.exports)};
            document.head.appendChild(style);
      `;  
}
module.exports = normal;