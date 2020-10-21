import { generate } from "./generate.js";
import { parseHTML } from "./parse.js";

export function compileToFunctions(template) {
    let ast = parseHTML(template);
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
