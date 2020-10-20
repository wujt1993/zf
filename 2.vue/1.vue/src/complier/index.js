import { generate } from "./generate.js";
import { parseHTML } from "./parse.js";

export function compileToFunctions(template) {
    let ast = parseHTML(template);
    let code = generate(ast);
    console.log(code)
}