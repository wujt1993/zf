const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',
    devtool:false,
    resolveLoader:{
        // modules: [
        //     path.resolve(__dirname, 'loaders'), 'node_modules'
        // ]
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    path.resolve(__dirname, 'loaders', 'style-loader.js'),
                    {
                        // loader:'css-loader',
                        loader:path.resolve(__dirname, 'loaders', 'css-loader.js'),
                        options:{
                            url:true,
                            import:true,
                            esModule: false,
                            importLoaders: 0, // 导入的css需要加载前面几个loader
                        }
                    },
                    // path.resolve(__dirname, 'loaders', 'logger2-loader.js'),
                    // path.resolve(__dirname, 'loaders', 'logger1-loader.js')
                ],
                include:path.resolve('src')
            },
            {
                test: /\.(png|jpg|gif)/,
                use:[
                    {
                        loader:"file-loader",
                        options:{
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({template:'./src/index.html'}),
    ]
}