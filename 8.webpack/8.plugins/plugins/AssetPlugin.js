
const {RawSource} = require("webpack-sources")
class AssetPlugin {

    apply(compiler) {
        compiler.hooks.emit.tapAsync("AssetPlugin",  (compilation, callback)=>{
            console.log(compilation.assets)
            let assetList = ``;
            for(let file in compilation.assets) {
                let source = compilation.assets[file].source();
                assetList+=`${file} ${source.length} bytes\r\n`;
            }
            compilation.assets['assets.md'] = new RawSource(assetList);
            callback();
        })
    }
}

module.exports = AssetPlugin;