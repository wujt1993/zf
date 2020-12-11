class DonePlugin{
    constructor(options) {
        this.options = options
    }
    apply(compiler) {
        compiler.hooks.done.tap("done",() =>{
            console.log("done~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        })
    }
}

module.exports = DonePlugin;