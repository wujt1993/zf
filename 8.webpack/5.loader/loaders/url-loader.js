const path = require("path");
const mime = require('mime');
const {getOptions} = require("loader-utils");

function loader(content) {
    let options = getOptions(this) || {};
    let { limit = 8 * 1024, fallback = "file-loader" } = options;
    console.log("--------------------------",this.resourcePath);
    console.log("--------------------------",mime.lookup(this.resourcePath));
    const mimeType = mime.lookup(this.resourcePath);
    if(content.length < limit) {
        let base64Str = `data:${mimeType};base64,${content.toString('base64')}`;
        return `module.exports =  ${JSON.stringify(base64Str)}`
    }else {
        let fileLoader = require(fallback);
        return fileLoader.call(this, content);
    }
}

loader.raw = true;
module.exports = loader;