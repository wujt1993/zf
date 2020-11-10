const Koa = require('koa');
const Router = require('koa-router');
const Vue = require("vue");
const render = require("vue-server-renderer");
const fs = require("fs");

let vm = new Vue({
    data() {
        return {
            msg: 'hello vue ssr'
        }
    },
    template: `<h1>{{msg}}</h1>`
})

const app = new Koa();
const router = new Router();
let template = fs.readFileSync("./template.html", 'utf-8')
router.get("/", async (ctx)=>{
    // ctx.body = await render.createRenderer().renderToString(vm);
    ctx.body = await render.createRenderer({template}).renderToString(vm)
})
app.use(router.routes());
app.listen(3000)