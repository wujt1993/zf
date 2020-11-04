import { forEachVal } from "../util";
import Module from "./module";

export default class ModuleCollection {

    constructor(options) {
        this.root = null;
        this.register([], options);
    }

    register(path, rootModule) {
        let newModule = new Module(rootModule);
        if(path.length == 0) {
            this.root = newModule;
        }else {
            let parent = path.slice(0,-1).reduce((memo, current)=>{
                return memo.getChild(current);
            }, this.root)
            parent.addChild(path[path.length - 1], newModule)
        }

        if(rootModule.modules) {
            forEachVal(rootModule.modules, (module, moduleName) => {
                this.register(path.concat(moduleName), module);
                
            })
        }
    }

    // register(path, rootModule) {
    //     let newModule = new Module(rootModule)
    //     if (path.length == 0) {
    //         this.root = newModule
    //     } else {
    //         // 我需要将当前模块 定义在父亲的身上
    //         // [a]  // [a,c] // [a,c,e]  // [b]
    //         let parent = path.slice(0, -1).reduce((memo, current) => {
    //             // this.root._children[a]
    //             // this.root._children[a]._children[c]
    //             // return memo._children[current];
    //             return memo.getChild(current);
    //         }, this.root)
    //         // this.root._children[a]._children[c]._children[e] = newModule
    //         parent.addChild(path[path.length - 1], newModule)
    //         // parent._children[path[path.length-1]] = newModule;
    //     }
    //     if (rootModule.modules) {
    //         forEachValue(rootModule.modules, (module, moduleName) => {
    //             this.register(path.concat(moduleName), module)
    //         })
    //     }
    // }
}