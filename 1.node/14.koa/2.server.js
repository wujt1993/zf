
// const Koa = require("koa")
const Koa = require("./koa")

const app = new Koa();

/**
 * 多个use 会组成promise 链，如果不执行next 将不会走下一个use
 * 
 */

const sleep = function(time = 1000) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve();
        }, time)
    })
}

app.use(async function(ctx, next) {
    console.log(1);
    ctx.body = "1";
    await next();
    console.log(6);
    ctx.body = "6";
})

app.use(async function(ctx, next) {
    throw Error("我错了")
    console.log(2);
    ctx.body = "2";
    await next();
    console.log(5);
    ctx.body = "5";
})

app.use(async function(ctx, next) {
    console.log(3);
    ctx.body = 3;
    await sleep(1000)
    await next();
    console.log(4);
    ctx.body = "4";
})
app.listen(3000, function() {
    console.log(`server start 3000`)
})

app.on("error", function(err) {
    console.log(err)
})