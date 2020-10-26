import { generate } from "./generate.js";
import { parseHTML } from "./parse.js";
export function compileToFunctions(template) {
    //获取ast树
    let ast = parseHTML(template);
    
    //获得可运行的render函数
    let code = generate(ast);
    let render = `with(this){return ${code}}`
    let fn = new Function(render);
    return fn
}

// function a(){
//     with(this) {
//         console.log(b)
//     }
// }
// a.call({b:1}) // 1