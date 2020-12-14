const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const path = require("path")
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, "dist")
    },
    entry: './src/index.js',
    module: {
        rules: [
            {
                test:/\.js$/,
                use:[path.resolve('./loaders/babel-loader.js')],
                include:path.resolve('src')
            },
            {
                test:/\.(jpg|png|gif)$/,
                use:[{
                    // loader: path.resolve('./loaders/file-loader.js'),
                    loader: path.resolve('./loaders/url-loader.js'),
                    options: {
                        name: '[name].[hash:10].[ext]',
                        limit: 8 * 1024
                    }
                }],
            },
            {
                test: /\.less$/, 
                // use: ['style-loader', 'css-loader','less-loader'],
                use: [path.resolve('./loaders/style-loader.js'),path.resolve('./loaders/less-loader.js')]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*'],
        }),
    ]
}