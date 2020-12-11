const core = require("@babel/core");
const types = require("babel-types");
const template = require('@babel/template');
const sourceCode = `
    function tryFn() {
        console.log(a)
    }
`;
const tryCatchPlugin = {
    visitor: {
        FunctionDeclaration(nodePath) {
            let {node}=nodePath;
            let {id} = node;
            let blockStatement = node.body;
            if(blockStatement.body && types.isTryStatement(blockStatement.body[0])){
                return ;
            }
            let catchStatement = template.statement('console.log(error)')();
            let catchClause = types.catchClause(types.identifier('error'), types.blockStatement([catchStatement]));
            let tryStatement = types.tryStatement(node.body,catchClause);
            //新的函数方法名不变sum,参数不变a,b
            var func = types.functionExpression(id,node.params,types.blockStatement([
                tryStatement
            ]),node.generator,node.async)
            nodePath.replaceWith(func);
        }
    }
}


let targetCore = core.transform(sourceCode, {
    plugins: [tryCatchPlugin]
});

console.log(targetCore.code);