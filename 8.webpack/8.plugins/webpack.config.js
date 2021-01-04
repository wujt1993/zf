const path = require("path");
// const DonePlugin = require("./plugins/DonePlugin");
// const AssetPlugin = require("./plugins/AssetPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ZipPlugin = require("./plugins/ZipPlugin");
module.exports = {
    entry: './src/index.js',
    devtool: false,
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    // path.resolve(__dirname, 'loaders', 'logger-loader.js')
                ]
            }
        ]
    },
    plugins: [
        // new DonePlugin({}),
        // new AssetPlugin(),
        new HtmlWebpackPlugin(),
        new ZipPlugin()
    ]
}   