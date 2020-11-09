import Module from  './module'
import {forEachVal} from "../util"
export default class ModuleCollection{

    constructor(options) {
        this.root = null;
        this.register([], options)
    }


    

    register(path, rootModule) {
        let newModule = new Module(rootModule);
        if(path.length == 0) {
            this.root = newModule
        }else {
            let parent = path.slice(0, -1).reduce((memo, current) =>{
                return memo.getChild(current)
            }, this.root)
            parent.addChild(path[path.length - 1], newModule)
        }

        if(rootModule.modules) {
            forEachVal(rootModule.modules,(module, moduleName) => {
                this.register(path.concat(moduleName), module)
            })
        }

    }
}