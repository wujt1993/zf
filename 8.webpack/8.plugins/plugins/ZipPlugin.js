let JsZip = require("jszip")
let {RawSource} = require('webpack-sources')
class ZipPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync("ZipPlugin", (compilation, callback) => {
            
            let zip = new JsZip();
            for (let filename in compilation.assets) {
                let source = compilation.assets[filename].source();
                zip.file(filename, source);
            }
            zip.generateAsync({ type: 'nodebuffer' }).then(content => {
                compilation.assets['dist.zip'] = new RawSource(content);
                callback();
            });
        })
    }

}
module.exports = ZipPlugin;