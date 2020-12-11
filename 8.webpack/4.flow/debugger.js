const webpack = require("./webpack");
const webpackConfig = require("./webpack.config");

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
    console.log(err);
    console.log(stats.toJson({
        assets: true,//产出的资源 [main.js]
        chunks: true,//代码块 [main]
        modules: true,//模块 ['./src/index.js','./src/title.js']
        entries: true //入口entrypoints []./src/index.js]
    }))
})