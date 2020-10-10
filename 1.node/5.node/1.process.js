//系统平台
console.log(process.platform);

// 用途： 可以获取当前执行node命令的目录 ,可以找到当前目录下的某个文件，可以改变
console.log(process.cwd()); //D:\wujt\zf\node\5.node
// process.chdir('../');
// console.log(process.cwd()); //D:\wujt\zf\node

//属性会返回包含用户环境的对象
// console.log(process.env)

// 属性返回启动 Node.js 进程的可执行文件的绝对路径名。
console.log(process.execPath)

//获取执行属性会返回一个数组，其中包含当 Node.js 进程被启动时传入的命令行参数。
// 第一个元素是 process.execPath。 第二个元素是正被执行的 JavaScript 文件的路径。 其余的元素是任何额外的命令行参数。
let args = process.argv.slice(2).reduce((pre, next, index, arr) => {
    if(next.startsWith("--")) {
        pre[arr[index].slice(2)] = arr[index+1]
    }
    return pre;
},{});

console.log(args)

