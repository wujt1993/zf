const path = require("path");
const mime = require("mime");
const fs = require("fs")

module.exports = function(dirname) {
    return async (ctx, next) => {
        let filename = path.join(dirname, ctx.path);
        try {
            let stats = fs.statSync(filename);
            if(stats.isFile()) {
                ctx.set("Content-Type", mime.getType(filename)+";charset=utf-8");
                ctx.body = fs.createReadStream(filename);
            }else{
                return next()
            }
        } catch (error) {
            return next();
        }
         
    }
}