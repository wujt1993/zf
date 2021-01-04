class DonePlugin {

    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.done.tap("DonePlugin", (stats)=>{
            console.log("DonePlugin~");
        })
    }
}


module.exports = DonePlugin;