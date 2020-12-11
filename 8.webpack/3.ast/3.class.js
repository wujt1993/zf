const core = require("@babel/core");
const types = require("babel-types");

const sourceCode = `
class Person {
    constructor(name) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
}
`;
const BabelPluginTransformClasses2 = {
    visitor: {
        ClassDeclaration(nodePath) {
            let node = nodePath.node;
            let { id } = node;//Person 标识符
            let classMethods = node.body.body;//获取 原来类的方法constructor getName
            let body = [];
            classMethods.forEach(method => {
                if (method.kind === 'constructor') {//如果方法的类型是构建函数的话
                    let constructorFunction = functionDeclaration(id,method.params,method.body,method.generator,method.async);
                    body.push(constructorFunction);
                } else {
                    let left = types.memberExpression(types.memberExpression(id,types.identifier('prototype')),method.key);
                    let right = functionDeclaration(null,method.params,method.body,method.generator,method.async);
                    let assignmentExpression = types.AssignmentExpression('=', left, right);
                    body.push(assignmentExpression);
                }
            });
            nodePath.replaceWithMultiple(body);//替换成多节点
        }
    }
}

function functionDeclaration(id, params, body, generator, async) {
    return {
        type: 'FunctionExpression',
        id,
        params,
        body,
        generator, async
    }
}

let targetCore = core.transform(sourceCode, {
    plugins: [BabelPluginTransformClasses2]
});

console.log(targetCore.code);