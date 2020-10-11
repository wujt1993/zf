/**
 * 服务器
 * 1、返回静态文件
 * 2、返回数据
 */
const { fstat } = require('fs');
const http = require('http');
const path = require("path");
const url = require('url');
const fs = require("fs");
const mime = require("mime")
//解决this指向可以采用箭头函数或bind()
class StaticServer {
    handleRequest(req, res) {
        const {pathname} = url.parse(req.url, true);
        let filePath = path.join(__dirname, pathname);
        let statObj = fs.stat(filePath,function (err, stats){
            if(err || !stats.isFile()) {
                res.statusCode = 404;
                res.statusMessage = 'no found';
                res.end("Not found")

            } else {

                res.setHeader("Content-Type",mime.getType(filePath)+';charset=utf-8')
                fs.createReadStream(filePath).pipe(res)
            }
        });
        
        
    }
    start(...args) {
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(...args)
    }
}

new StaticServer().start(3000,function(){
    console.log('server start 3000')
})