const esprima = require("esprima");
const estraverse = require("estraverse");
const escodegen = require("escodegen");


var sourceCode = "function ast(){}";

let ast = esprima.parse(sourceCode);
let indent = 0;
function padding() {
    return "　".repeat(indent)
}
estraverse.traverse(ast,{
    enter(node, parent) {
        if(node.type === 'FunctionDeclaration') {
            node.id.name = 'new'+node.id.name;
        }
        console.log(`${padding()}进入${node.type}`);
        indent+=2
    },
    leave(node, parent) {
        indent-=2
        console.log(`${padding()}离开${node.type}`);
    }
})

let code = escodegen.generate(ast);
console.log(code)