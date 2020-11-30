
import { generate } from './generate.js';
import {parseHTML} from './parse.js'


export function compilerToFunctions(template) {
    // 解析html树：将HTML -> ast 语法树
    let root = parseHTML(template);
    // 将sat语法树转成render 函数字符串
    let code = generate(root);
    console.log(code)
}