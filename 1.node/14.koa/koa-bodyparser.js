
module.exports = function bodyparser() {
    return async (ctx, next) => {
        let data = await body(ctx);
        ctx.request.body  = data;
        return next();
    }
}

function body(ctx) {
    return new Promise((resolve, reject)=>{
        let arr = [];
        ctx.req.on("data", function(chunk){
            arr.push(chunk)
        })
        ctx.req.on("end", function() {
            resolve(Buffer.concat(arr))
        })
    })
}