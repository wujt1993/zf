
const serve = require("rollup-plugin-serve");
const {nodeResolve} = require("@rollup/plugin-node-resolve");
const ts = require("rollup-plugin-typescript2");
export default {
    input: 'src/index.ts',
    output: {
        format: 'umd',
        file: 'dist/bundle.js',
        sourcemap: true,
        name:'VueReactivity'
    },
    plugins: [
        nodeResolve({
            extensions: ['.ts','.js']
        }),
        ts({
            tsconfig: 'tsconfig.json'
        }),
        serve({
            openPage: '/public/index.html',
            contentBase: '',
            open: true,
            port: 3000
        }),

    ]
}
