const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require('./response');

class application {

    constructor() {
        //每一个应用应该有独立的上下文
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
        

    }


    use(fn) {
        this.fn = fn
    }


    createContext(req, res) {
        //每个请求应该有独立的ctx
        let ctx = Object.create(this.context);
        let request = Object.create(this.request);
        let response = Object.create(this.response);

        ctx.request = request;
        ctx.response = response;

        ctx.req = ctx.request.req = req;
        ctx.res = ctx.request.res = res;

        return ctx;
    }

    handleRequest(req, res) {
        let ctx = this.createContext(req, res);
        this.fn(ctx);
    }

    listen(...args) {
        const server = http.createServer(this.handleRequest.bind(this))
        server.listen(...args)
    }
}

module.exports = application