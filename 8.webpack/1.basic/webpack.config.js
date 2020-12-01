const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
console.log('webpack', process.env.NODE_ENV)
module.exports = (env) => {
    console.log(env)
    return ({
        mode: 'development',
        entry: './src/index.js',
        devtool: 'cheap-source-map',
        output: {
            filename: 'mian.js',
            path: path.resolve(__dirname, 'dist')
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'static'),
            open: true,
            writeToDisk: true,
            port: 3000
        },
        module: {
            rules: [
                { test: /\.txt$/, use: 'raw-loader' },
                { test: /\.css/, use: ['style-loader', 'css-loader'] },
                { test: /\.scss/, use: ['style-loader', 'css-loader', 'sass-loader'] },
                { test: /\.less/, use: ['style-loader', 'css-loader', 'less-loader'] },
                {
                    test: /\.(jpg|png|bmp|gif|svg)$/, use: [{
                        // loader: 'file-loader',
                        loader: 'url-loader', // file-loader的加强版，当图片的大小小于limit时，转成base64
                        options: {
                            esModule: false,//不采用es6模式，require取值不需要取default
                            name: '[hash:10].[ext]',
                            limit: 8 * 1024 // 8k
                        }
                    }]
                },
                { test: /\.html$/, use: 'html-loader' },
                {
                    test: /\.jsx?$/, use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': "'production'"
            })
        ]
    })
}