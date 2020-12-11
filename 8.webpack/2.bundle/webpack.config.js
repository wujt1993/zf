const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, 'dist'),

    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*"]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        })
    ]
}