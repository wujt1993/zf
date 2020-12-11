const path = require("path");
const RunPlugin = require("./plugins/run-plugin");
const DonePlugin = require("./plugins/done-plugin");
module.exports = {
    context: process.cwd(),
    mode: 'development',
    devtool: 'inline-source-map',
    // entry: './src/index.js',
    entry: {
        page1: './src/page1.js',
        page2: './src/page2.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js','.json']
    },
    module: {
        rules: [
            {
                test: /.js$/, 
                use:[
                    path.resolve(__dirname, 'loaders/logger1-loader.js'),
                    path.resolve(__dirname, 'loaders/logger2-loader.js')
                ]
            }
        ]
    },
    plugins: [
        new RunPlugin(),
        new DonePlugin()
    ]
}

