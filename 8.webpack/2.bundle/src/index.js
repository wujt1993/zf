
//commonjs
// let title = require("./title.js");
// console.log(title)

// es
// import title, {age} from './title.js'
// console.log(title);
// console.log(age);


// 异步
import(/* webpackChunkName: "hello" */ "./hello").then((result) => {
    console.log(result);
});