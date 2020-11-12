const Koa = require("koa");
const Router = require("koa-router");
const Vue = require("vue");
const vueServerRenderer = require("vue-server-renderer");
const fs = require("fs");
const static = require("koa-static");
const path = require("path");


const app = new Koa();
const router = new Router();

let bundle = fs.readFileSync(path.resolve(__dirname, './dist/server.bundle.js'),'utf-8');
let template = fs.readFileSync(path.resolve(__dirname, './dist/index.ssr.html'),'utf-8');
const render = vueServerRenderer.createBundleRenderer(bundle,{
    template
})
router.get("/", async ctx=>{
    ctx.body = await new Promise((resolve,reject)=>{
        render.renderToString((err,html)=>{ //  虽然本身是promise 但是使用async await 不能解析样式 只能通过回调的方式
            resolve(html)
        })
    }); // ，渲染成字符串
})

app.use(router.routes());
app.use(static(path.resolve(__dirname, 'dist')))
app.listen(3000)