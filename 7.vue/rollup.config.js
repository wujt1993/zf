import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'

export default {
    input: 'src/index.js',
    output: {
        format: 'umd',
        file: 'dist/vue.js',
        name: 'Vue',
        sourcemap: true// 启用源码调试
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: ["@babel/preset-env"]
        }),
        serve({
            open: true,
            openPage: '/public/index.html',
            port: 3000,
            contentBase: ''
        })
    ]
}