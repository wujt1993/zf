const path = require("path")

//1、平台特定的路径定界符， win32 -> ;   POSIX -> :
console.log("1、平台特定的路径定界符：" + path.delimiter)

//console.log(process.env.path.split(path.delimiter))

//2、返回文件目录
console.log("2、文件目录：" + path.dirname("d:\\wujt\\zf")) //d:\wujt

//3、返回文件扩展名
console.log("3、文件扩展名：" + path.extname("a.js")) // .js

//4、路径分隔符 win32 -> \   POSIX -> /
console.log("4、路径分割符：" + path.sep)

//5、是否为绝对路径
console.log("5.1、a: 是否为绝对路径：" + path.isAbsolute("a"))//false
console.log("5.2、/a: 是否为绝对路径：" + path.isAbsolute("/a"))//true
console.log("5.3、c:/a: 是否为绝对路径：" + path.isAbsolute("c:/a"))//true

//6、拼接路径
console.log("6、path.join 拼接路径：" + path.join("/a", "/b" , "index.html")) //\a\b\index.html

//7、将路径解析
console.log("7、路径解析：" ,path.parse('/目录1/目录2/文件.txt'))

//8、路径或路径片段的序列解析为绝对路径。
console.log("当前工作目录：",path.resolve())
console.log("当前工作目录：",__dirname)
console.log("最后一个绝对路径开始拼接" + path.resolve('/目录1/目录2', '/目录3/目录4/'))
console.log("从最后一个绝对路径开始拼接" + path.resolve('/目录1/目录2', '目录3/目录4/'))
console.log("路径拼接完之后还不是绝对路径则将工作目录拼接进去" + path.resolve('目录1/目录2', '目录3/目录4/'))


//9、path.relative() 方法根据当前工作目录返回 from 到 to 的相对路径
console.log("去掉相同的地方"+path.relative("a", "a/a.js")) //去掉相同的部分 如果from 是相对路径，则会与工作目录拼接
console.log("去掉相同的地方"+path.relative("a", "/a/a.js")) //去掉相同的部分 如果from 是相对路径，则会与工作目录拼接


/**、方法从对象返回路径字符串
 * pathObject <Object>
 ****dir <string>
 ****root <string>
 ****base <string>
 ****name <string>
 ****ext <string>
 */
console.log("dir存在，则忽略root："+ path.format({
    root: '\\ignored',
    dir: '\\home\\user\\dir',
    base: 'file.txt'
}))

console.log("dir存在，则忽略root："+ path.format({
    root: '\\',
    base: 'file.txt'
}))

console.log("base存在，则忽略ext、name：" + path.format({
    root: '/',
    base: 'file.txt',
    name: 'ignored',
    ext: '.ignored',
}));
console.log("base存在，则忽略ext、name：" + path.format({
    root: '/',
    name: 'ignored',
    ext: '.ignored',
}));

