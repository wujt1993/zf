let a = 1;
let fn = `
    console.log(typeof a)
`

//eval
eval(fn) // number 会获取到a、存在环境污染

//new Function
new Function(fn)();//undefined

//vm.runInThisContext
const vm = require('vm');
vm.runInThisContext(fn)//undefined