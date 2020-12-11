const { SyncHook } = require('tapable');
const fs = require("fs");
const path = require("path");
const types = require("babel-types");

const parser = require("@babel/parser");// code 转ast 树
const { Dependency } = require('webpack');
const traverse = require("@babel/traverse").default;// 遍历ast树 
const generator = require("@babel/generator").default; // ast树转成code

function toUnixPath(filePath) {
    return filePath.replace(/\\/g, path.posix.sep);
}
let baseDir = toUnixPath(process.cwd());
class Compiler {
    constructor(options) {
        this.modules = new Set();//存放所有的模块
        this.chunks = new Set();// 存放所有的代码块
        this.assets = {};//输出文件名
        this.options = options;
        this.hooks = {
            run: new SyncHook(),
            done: new SyncHook()
        }
    }

    // 4、执行对象的run方法开始执行编译
    run() {
        this.hooks.run.call();

        // 5、根据配置中的entry找出入口文件
        let entry = {};
        if (typeof this.options.entry == "string") {
            entry.main = this.options.entry
        } else {
            entry = this.options.entry
        }
        for (let entryName in entry) {
            let entryFilePath = toUnixPath(path.join(this.options.context,entry[entryName]));
            // 6、从入口文件出发,调用所有配置的Loader对模块进行编译
            let entryModule = this.buildModule(entryName, entryFilePath);

            // 8、根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk

            let modules = [];
            this.modules.forEach((module) => {
                if (module.name === entryName) {
                    modules.push(module)
                }
            })
            let chunk = { name: entryName, entryModule, modules };
            this.chunks.add(chunk);
        }
        // 获取输出文件列表
        this.chunks.forEach(chunk => {
            //key文件名 值是打包后的内容
            let filename = this.options.output.filename.replace('[name]',chunk.name);
            this.assets[filename] = getSource(chunk);
        });

        //9.在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
        this.files = Object.keys(this.assets);//['main.js']
        //10、存放本次编译输出的目标文件路径
        for (let file in this.assets) {
            let targetPath = path.join(this.options.output.path, file);//page1.js page2.js
            fs.writeFileSync(targetPath, this.assets[file]);
        }

        this.hooks.done.call();
    }

    buildModule(name, modulePath) {
        // 获取源文件源码
        let originalSourceCode = fs.readFileSync(modulePath, 'utf-8');
        let targetSourceCode = originalSourceCode;
        //查找此模块对应的loader对代码进行转换
        let rules = this.options.module.rules;
        let loaders = [];
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            if (rule.test.test(modulePath)) {
                loaders = [...loaders, ...rules[i].use];
            }
        }
        for (let i = loaders.length - 1; i >= 0; i--) {
            targetSourceCode = require(loaders[i])(targetSourceCode);
        }

        //获取模块id
        let moduleId = './' + path.posix.relative(baseDir, modulePath);

        let module = { id: moduleId, dependencies: new Set() , name}
        // 将源码转化为ast语法树
        let astTree = parser.parse(targetSourceCode, { sourceType: 'module' });

        traverse(astTree, {
            CallExpression: ({ node }) => {
                //处理require
                if (node.callee.name === 'require') {
                    //1.相对路径 2.相对当前模块  
                    //2.绝对路径
                    let moduleName = node.arguments[0].value;
                    //要判断一个moduleName绝对还是相对，相对路径才需要下面的处理
                    //获取路径所有的目录
                    //C:\aproject\zhufengwebpack202011\5.flow\src
                    let dirname = path.posix.dirname(modulePath);
                    //C:\aproject\zhufengwebpack202011\5.flow\src\title
                    let depModulePath = path.posix.join(dirname, moduleName);
                    let extensions = this.options.resolve.extensions;
                    depModulePath = tryExtensions(depModulePath, extensions, moduleName, dirname);
                    //模块ID的问题 每个打包后的模块都会有一个moduleId
                    //"./src/title.js"  depModulePath=/a/b/c  baseDir=/a/b relative=>c ./c
                    let depModuleId = './' + path.posix.relative(baseDir, depModulePath);//./src/title.js
                    //修改抽象语法树
                    node.arguments = [types.stringLiteral(depModuleId)];
                    module.dependencies.add(depModulePath);
                }
            }
        });
        //将ast语法树转成code
        let { code } = generator(astTree);
        module._source = code;//转换后的代码 module moduleId dependencies _source

        //7、再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
        module.dependencies.forEach(dependency => {
            let dependencyModule = this.buildModule(name,dependency);
            this.modules.add(dependencyModule);
        })

        return module;

    }
}

//let chunk = {name:'main',entryModule,modules:this.modules}; 
function getSource(chunk) {
    return `
    (() => {
     var modules = {
       ${chunk.modules.map(module => `
           "${module.id}": (module,exports,require) => {
             ${module._source}
           }`).join(',')
        }
     };
     var cache = {};
     function require(moduleId) {
       if (cache[moduleId]) {
         return cache[moduleId].exports;
       }
       var module = (cache[moduleId] = {
         exports: {},
       });
       modules[moduleId](module, module.exports, require);
       return module.exports;
     }
     (() => {
      ${chunk.entryModule._source}
     })();
   })();
    `;
}
function tryExtensions(modulePath, extensions, originalModulePath, moduleContext) {

    for (let i = 0; i < extensions.length; i++) {
        console.log(modulePath + extensions[i])
        if (fs.existsSync(modulePath + extensions[i])) {
            return modulePath + extensions[i];
        }
    }
    throw new Error(`Module not found: Error: Can't resolve '${originalModulePath}' in '${moduleContext}'`);
}
module.exports = Compiler;