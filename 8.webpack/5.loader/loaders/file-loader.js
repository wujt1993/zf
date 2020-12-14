
const { getOptions, interpolateName } = require("loader-utils")

function loader(content) {
    console.log("~file-loader");
    const options = getOptions(this) || {}; // 获取loader的参数
    const fileName = interpolateName(this, options.name, content);//获得文件的名称
    //其实就是向输出目录里多写一个文件文件名文件名叫filename，内容
    this.emitFile(fileName, content);
    if (options.esModule) {
        return `export default "${fileName}"`;
    }else{
        return  `modules.exports = "${fileName}"`; 
    }
}

loader.raw = true; //输出buffer
module.exports = loader; 