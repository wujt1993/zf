class RunPlugin{
    constructor(options) {
        this.options = options
    }
    apply(compiler) {
        compiler.hooks.run.tap("run",() =>{
            console.log("run ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        })
    }
}

module.exports = RunPlugin;