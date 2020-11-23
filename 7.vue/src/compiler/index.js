
import {parseHTML} from './parse.js'


export function compilerToFunctions(template) {
    //解析html树：将HTML -> ast 语法树
    let root = parseHTML(template) 
}