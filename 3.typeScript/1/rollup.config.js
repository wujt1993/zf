import ts from 'rollup-plugin-typescript2'
import {nodeResolve} from "@rollup/plugin-node-resolve"
import serve from "rollup-plugin-serve"
import path from "path"

export default {
    input: 'src/index.ts',
    output: {
        format: 'iife', //自执行函数
        file: path.resolve(__dirname, 'dist/bundle.js'),//出口文件
        sourcemap: true,//生成映射文件
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