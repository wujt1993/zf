import serve from 'rollup-plugin-serve';
import babel from 'rollup-plugin-babel';

export default { // 用于打包的配置
    input:'./src/index.js', // 入口文件
    output: {
        file: 'dist/vue.js',//出口文件
        name: 'Vue', //文件暴露的变量名
        format: 'umd',//将变量挂载到全局变量上
        sourcemap: true, //es6 -> es5
    },
    plugins: [
        babel({
            exclude:"node_modules/**",// 这个目录不需要用babel转换
        }),
        serve({
            open: true,//自动打开文件
            openPage: "/public/index.html",
            port:3000,
            contentBase:''
        })
    ]
}