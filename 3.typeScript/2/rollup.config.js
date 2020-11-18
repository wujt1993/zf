const path = require("path")
const serve = require("rollup-plugin-serve");
const ts = require("rollup-plugin-typescript2");
const {nodeResolve} = require("@rollup/plugin-node-resolve");
export default{
    input: './src/index.ts',
    output: {
        format: 'iife',//自执行函数
        file: path.resolve(__dirname, 'dist/bundle.js'),
        sourcemap: true
    },
    plugins: [
        nodeResolve({
            extensions: ['.js', '.ts']
        }),
        ts({
            tsconfig: path.resolve(__dirname, 'tsconfig.json')
        }),
        serve({
            port: 3000,
            open: true,
            openPage: '/public/index.html',
            contentBase: ''
        })
    ]
}