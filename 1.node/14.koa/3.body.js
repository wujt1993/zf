const Koa = require("koa");

const app = new Koa();


app.use(async function(ctx, next) {
    if(ctx.path === "/login" && ctx.method === 'GET'){
        ctx.body = `
            <form action="/login" method="post">
                <input name="username"><br>
                <input name="pasword"><br>
                <button>提交</button>
            </form>
        `
    }else {
        await next()
    }
})


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

app.use(async function(ctx, next) {
    if (ctx.path === '/login' && ctx.method == 'POST') {
        // 读取用户传递的数据
        ctx.set('Content-Type', 'text/html;charset=utf-8');
        ctx.body = await body(ctx)

    } else {
        await next();
    }
})

app.listen(3000, function() {
    console.log(`server start 3000`)
})