//webpack是一个函数

const Compiler = require("./compiler");

function webpack(options) {
    //1、初始化参数：从配置文件和Shell语句中读取并合并参数,得出最终的配置对象
    const shellConfig = process.argv.slice(2).reduce((shellConfig,item)=>{
        let [key, val] = item.split("=");
        shellConfig[key.slice(2)] = val;
        return shellConfig;
    },{});
    let finalConfig = {...options, ...shellConfig};
    //2、用上一步得到的参数初始化Compiler对象
    const compiler = new Compiler(finalConfig);
    
    //3、加载所有配置的插件
    if(finalConfig.plugins && Array.isArray(finalConfig.plugins)) {
        finalConfig.plugins.forEach(plugin => {
            plugin.apply(compiler);
        });
    }
    return compiler;
}

module.exports = webpack;