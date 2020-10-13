const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require('./response');
const Stream = require("stream");
const { EventEmitter } = require("events");

class application extends EventEmitter{

    constructor() {
        super();
        //每一个应用应该有独立的上下文
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);

        this.middleWares = []
    }


    use(fn) {
        //this.fn = fn
        this.middleWares.push(fn);
    }


    createContext(req, res) {
        //每个请求应该有独立的ctx
        let ctx = Object.create(this.context);
        let request = Object.create(this.request);
        let response = Object.create(this.response);

        
        ctx.request = request;
        ctx.response = response;

        ctx.request.req = ctx.req = req;
        ctx.response.res = ctx.res = res;
        return ctx;
    }
    compose(ctx) {
        let i = -1;
        const dispatch = (index) =>{
            if(index <= i) return Promise.reject('next() called multiples');
            if(index === this.middleWares.length) return Promise.resolve();
            i = index;
            let middleWare = this.middleWares[index];
            try {
                return Promise.resolve(middleWare(ctx, ()=>dispatch(index+1)))
            } catch (error) {
                return Promise.reject(error)
            }
            

        }
        return dispatch(0);
    }
    handleRequest(req, res) {
        let ctx = this.createContext(req, res);
        this.compose(ctx).then(()=>{
            let body = ctx.body; // 最终将body的结果返回获取
            if (typeof body == 'string' || Buffer.isBuffer(body)) {
                res.end(ctx.body); // 用户多次设置只采用最后一次
            } else if (body instanceof Stream) {
                // res.setHeader(`Content-Disposition`,`attachement;filename=${encodeURIComponent('下载')}`);
                body.pipe(res); // 可读流. pipe(可写流)
            } else if (typeof body == 'object') {
                res.end(JSON.stringify(body))
            } else {
                res.end(`Not Found`);
            }
        }).catch(e=>{
            this.emit("error", e)
        })
        
        this.on("error", ()=>{
            res.statusCode = 500;
            res.end('Internal Error')
        })
    }

    listen(...args) {
        const server = http.createServer(this.handleRequest.bind(this))
        server.listen(...args)
    }
}

module.exports = application