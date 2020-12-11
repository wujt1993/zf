const core = require("@babel/core");
const types = require("babel-types");
const babelPluginTransformEs2015ArrowFunctions = require("babel-plugin-transform-es2015-arrow-functions");

const sourceCode = `
    const sum = (a,b) => {
        console.log(this);
        return a+b;
    }
`;
const babelPluginTransformEs2015ArrowFunctions2 = {
    visitor: {
        ArrowFunctionExpression(nodePath) {
            let node = nodePath.node;//获取当前的节点
            //处理this指针的问题
            hoistFunctionEnvironment(nodePath);
            node.type = 'FunctionDeclaration';
        }
    }
} 
function hoistFunctionEnvironment(fnPath) {
    //thisEnvFn=Program节点
    const thisEnvFn = fnPath.findParent(p =>{
        return (p.isFunction() && !p.isArrowFunctionExpression()) || p.isProgram();
    })

    //thisPaths就放着哪些地方用到this   
    let thisPaths = getScopeInfoInformation(fnPath);

    let thisBinding='_this';//把this变量重定向的变量名
    //如果有地方用到了，则需要在thisEnvFn环境上添加一个语句 let _this = this;
    if(thisPaths.length>0){
        //表示在this函数环境中添加一个变量id_this=初始值 this thisExpression
        thisEnvFn.scope.push({
            id:types.identifier(thisBinding),
            init:types.thisExpression()
        });
        //遍历所有的使用到this的路径节点，把所有 thisExpression会变成_this标识符
        thisPaths.forEach(thisChild=>{
            let thisRef = types.identifier(thisBinding);
            thisChild.replaceWith(thisRef);
        });
    }
}

function getScopeInfoInformation(fnPath) {
    let thisPaths = [];
    fnPath.traverse({
        ThisExpression(thisPath) {
            thisPaths.push(thisPath)
        }
    })
    return thisPaths;
}

let targetCore = core.transform(sourceCode, {
    plugins: [babelPluginTransformEs2015ArrowFunctions2]
});

console.log(targetCore.code);