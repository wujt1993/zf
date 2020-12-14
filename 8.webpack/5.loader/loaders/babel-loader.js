const core = require('@babel/core');
const path = require('path');
/**
 * 
 * @param {*} source 上一个loader给我这个loader的内容或者最原始模块内容
 * @param {*} inputSourceMap 上一个loader传递过来的sourceMap
 * @param {*} data  本loader额外的数据
 */
function loader(source, inputSourceMap, data) {//es6
    // console.log(data.name);
    //this=loaderContext loader上下文对象
    console.log(path.basename(this.resourcePath));
    const options = {
        presets: ["@babel/preset-env"],
        inputSourceMap,//上一个loader传递过来的 sourcemap
        sourceMaps: true,//告诉babel我要生成sourceMap
        filename: path.basename(this.resourcePath)
    }
    //code 转换后的代码 map sourcemap ast 抽象语法树
    let { code, map, ast } = core.transform(source, options);
    //this.callback 第4个参数 ast 和data有关系吗 没有，一点关系都没有
    return this.callback(null, code, map, ast);
}
loader.pitch = function (remainingRequest, previousRequest, data) {
    //后面的loader等都可以拿到data中的值 
    //每一个loader都有一个自己的data,相互之间是完全 独立的
    data.name = 'babel-loader-pitch';
}
module.exports = loader;
/**
 * 当你需要返回多值的时候需要使用 this.callback来传递多个值
 * 只需要返回一个值,可以直接 return
 * map 可以让我们进行代码调试 debug的时候可以看到源代码
 * ast 如果你返回了ast给webpack。webpack则直接分析 就可以，不需要自己转AST了，节约 时间
 */