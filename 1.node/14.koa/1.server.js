
// const Koa = require("koa");
const Koa = require("./koa");
const fs = require("fs")
const app = new Koa();



app.use(function(ctx){

    // ctx是koa中的上下文对象  (req,res 原生的)  (request,response 自己封装的)

    // 自己封装的request上有原生的req属性
    // koa基于request对象自己封装了属性 let {pathname} = url.parse(req.url) =>path
    // console.log('req...url....' + ctx.req.url); // 原生的req对象
    // console.log('request...url....' + ctx.request.req.url); //原生的req对象
    // console.log('request...path....' + ctx.request.path); // 自己封装的/
    // console.log('ctx...path....' + ctx.path); // 自己封装的
    // console.log('ctx...query....' , ctx.query); // 自己封装的
    
    // console.log('ctx......response.........', ctx.response.body)
    // console.log('ctx.........', ctx.body);
    ctx.body = 'hello world';
    ctx.body = {hello: 'world'}
    ctx.res.setHeader("Content-Type", 'text/md;charset=utf-8')
    ctx.body = fs.createReadStream("./note.md")

})
app.listen(3000, function() {
    console.log(`server start 3000`)
})