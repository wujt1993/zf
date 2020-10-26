import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {
    input: './src/index.js',
    output: {
        file: 'dist/vue.js',
        name: 'Vue',
        format: 'umd',
        sourcemap: true,
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        serve({
            open: true,
            openPage: '/public/index.html',
            port: 3000,
            contentBase: ''
        })
    ]
}