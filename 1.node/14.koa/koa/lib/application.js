const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require('./response');
const Stream = require("stream");
const { EventEmitter } = require("events");

class application extends EventEmitter{
    constructor() {
        super();
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);

        this.middlewares = []
    }
    use(fn) {
        this.middlewares.push(fn);
    }
    createContext(req, res) {
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
        const dispatch = (i) =>{
            if(i === this.middlewares.length) return Promise.resolve();
            let middleware = this.middlewares[i];
            try {
                return Promise.resolve(middleware(ctx, ()=>dispatch(i+1)))
            } catch (error) {
                return Promise.reject(error)
            }
            
        }
        return dispatch(0)
    }
    handlerRequest(req, res) {
        let ctx = this.createContext(req, res);
        res.statusCode = 404;
        this.compose(ctx).then(()=>{
            let body = ctx.body;
            if(body == null) {
                res.end("not found");
            }else if(typeof body === 'string' || Buffer.isBuffer(body)) {
                res.end(body)
            }else if( body instanceof Stream) {
                body.pipe(res)
            }else{
                res.end(JSON.stringify(body))
            }
        }).catch(err=>{
            this.emit("error", err)
        })
        
        this.on("error", function(err) {
            res.statusCode = 500;
            res.end("Internal Error")
        })

        
    }
    listen(...args) {
        const server = http.createServer(this.handlerRequest.bind(this));
        server.listen(...args);
    }
}

module.exports = application