const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs").promises;
const mime = require("mime");
const {createReadStream} = require("fs");


class StaticServer {
    async handleRequest(req, res) {
        let {pathname} = url.parse(req.url, true);
        let filePath = path.join(__dirname, pathname);
        try{
            let stats = await fs.stat(filePath);
            if(stats.isFile()) {
                // let data = await fs.readFile(filePath);
                res.setHeader('Content-Type', mime.getType(filePath) + ";charset=utf-8");
                // res.end(data)
                createReadStream(filePath).pipe(res);
            }else{
                filePath = path.join(filePath,'index.html');
                await fs.access(filePath); // 异步方法 不存在会报错
                res.setHeader('Content-Type','text/html;charset=utf-8');
                createReadStream(filePath).pipe(res);
            }
        }catch(e) {
            res.statusCode = 404;
            res.end(pathname + ' Sis not Found')
        }
        
    }
    start(port, db) {
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(port,()=>{
            db();
        })
    }

}

new StaticServer().start(3000, function () {
    console.log(`server start 3000`);
})