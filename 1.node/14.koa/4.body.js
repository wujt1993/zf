const Koa = require("koa");
const fs = require("fs");
const bodyparser = require("./koa-bodyparser");
const static = require("./koa-static")
const path = require("path")



const app = new Koa();

app.use(static(__dirname))

app.use(bodyparser())


app.use(async function(ctx, next) {
    if (ctx.path === '/login' && ctx.method == 'POST') {
        // 读取用户传递的数据
        ctx.set('Content-Type', 'text/html;charset=utf-8');
        ctx.body = ctx.request.body

    } else {
        await next();
    }
})

app.listen(3000, function() {
    console.log(`server start 3000`)
})