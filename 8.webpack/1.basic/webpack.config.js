const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackExternalssPlugin = require("html-webpack-externals-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
// const PostCssPresetEnv = require("postcss-preset-env");
// console.log('webpack', process.env.NODE_ENV);
module.exports = (env) => {
    // console.log(env)
    return ({
        mode: 'development',
        entry: './src/index.js',
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin()
            ]
        },
        devtool: 'cheap-source-map',
        // watch: true,
        watchOptions: {
            ignored: /node_moudles/,//不监听此文件夹
            aggregateTimeout: 300,//监听到变化后，等300ms再执行，默认300
            poll: 1000,//1000次/秒检测
        },
        output: {
            filename: 'mian.[hash:10].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'static'),
            open: true,
            writeToDisk: true,
            port: 3000,
            proxy: {
                // '/api': 'http://localhost:8081',
                "/api": {
                    target: 'http://localhost:8081',
                    changeOrigin: true,
                    pathRewrite: { "^/api": "" }
                }
            }
        },
        externals: {
            jquery: '$',
        },
        module: {
            rules: [
                {
                    test: require.resolve('jquery'),
                    loader: 'expose-loader',
                    options: {
                        exposes: {
                            globalName: '$',
                            // override: true
                        }
                    }
                },
                { test: /\.txt$/, use: 'raw-loader' },
                {
                    test: /\.css/, use: [MiniCssExtractPlugin.loader, 'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-preset-env"
                                ],
                            },
                        }

                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecesion: 8
                        }
                    }]
                },
                { test: /\.scss/, use: ['style-loader', 'css-loader', 'sass-loader'] },
                { test: /\.less/, use: ['style-loader', 'css-loader', 'less-loader'] },
                {
                    test: /\.(jpg|png|bmp|gif|svg)$/, use: [{
                        // loader: 'file-loader',
                        loader: 'url-loader', // file-loader的加强版，当图片的大小小于limit时，转成base64
                        options: {
                            esModule: false,//不采用es6模式，require取值不需要取default
                            name: 'images/[name].[hash:10].[ext]',
                            limit: 1 * 1024, // 1k
                            // outputPath: 'images',
                            // publicPath: '/images'
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
                template: './src/index.html',
                minify: {
                    collapseWhitespace: true,
                    removeComments: true
                }
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': "'production'"
            }),
            new webpack.ProvidePlugin({
                $: 'jquery'
            }),
            new HtmlWebpackExternalssPlugin({
                externals: [
                    {
                        module: 'jquery',
                        entry: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.js',
                        global: '$'
                    }
                ]

            }),
            // new CopyWebpackPlugin({
            //     patterns: [{
            //         from: path.resolve(__dirname, 'src/static'),
            //         to: path.resolve(__dirname, 'dist/static')
            //     }]
            // }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['**/*']
            }),
            new MiniCssExtractPlugin({
                filename: 'css/mian.[hash:10].css'
            }),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    })
}