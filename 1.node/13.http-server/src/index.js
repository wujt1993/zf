const http = require("http");
const path = require("path");
const fs = require("fs").promises;
const { createReadStream, readFileSync } = require("fs");
const url = require("url");


const mime = require("mime");
const ejs = require("ejs");
const chalk = require("chalk");
const crypto = require("crypto");
// console.log(crypto.createHash('md5').update("12").update("34").digest('base64'))//必须是buffer 或 字符串
// console.log(crypto.createHash('md5').update("1234").digest('base64'))//必须是buffer 或 字符串

class Server {
    constructor(config) {
        this.port = config.port;
        this.directory = config.directory;
        this.template = readFileSync(path.resolve(__dirname, 'render.html'), 'utf8')
    }

    async handleRequest(req, res) {
        let { pathname } = url.parse(req.url);
        pathname = decodeURIComponent(pathname);
        const filepath = path.join(this.directory, pathname);
        try {
            let stats = await fs.stat(filepath)
            if (stats.isFile()) {
                this.sendFile(req, res, stats, filepath)
            } else {
                let dirs = await fs.readdir(filepath);
                dirs = dirs.map(item => {
                    return {
                        href: path.join(pathname, item),
                        dir: item
                    }
                })
                let result = await ejs.render(this.template, { dirs }, { async: true });
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end(result);
            }
        } catch (e) {
            this.sendError(req, res)
        }
    }

    cache(req, res, stats, filepath) {
        // 设置缓存， 默认强制缓存10s  10s内部不在像服务器发起请求 （首页不会被强制缓存） 引用的资源可以被强制缓存
        res.setHeader("Expires", new Date(Date.now() + 10 * 1000).toGMTString());

        // no-cache 表示每次都像服务器发请求 
        // no-store 表示浏览器不进行缓存
        // max-age = 10 表示10秒内不向服务器发起请求
        res.setHeader("Cache-control", 'no-cache');

        //当请求过来时且强制缓存过期后，文件如果未修改，则走协商缓存 304
        //1）判断文件的修改时间  2）// 采用指纹Etag  - 根据文件产生一个唯一的标识 md5

        let ctime = stats.ctime.toGMTString();//获取本地文件最后一次修改时间

        let ifModifiedSince = req.headers['if-modified-since'];//获取上一次请求，该文件设置的最后一次修改时间

        let ifNoMatch = req.headers['if-none-match'];//获取上一次请求设置的etag

        let etag = crypto.createHash("md5").update(readFileSync(filepath)).digest("base64");



        //设置该文件最后一次修改的时间
        res.setHeader("Last-Modified", ctime);
        res.setHeader("Etag", etag)

        if(ctime != ifModifiedSince) return false;
        if(ifNoMatch != etag) return false;

        return true;
    }


    sendFile(req, res, stats, filepath) {
        // console.log("-------------", filepath)
        if (this.cache(req, res, stats, filepath)) {
            res.statusCode = 304;
            return res.end();
        }
        res.setHeader("Content-Type", mime.getType(filepath) + ';charset=utf-8');
        createReadStream(filepath).pipe(res);
    }
    sendError(req, res) {
        res.statusCode = 404;
        res.end("not found")
    }
    start() {
        const server = http.createServer(this.handleRequest.bind(this))
        server.listen(this.port, () => {
            console.log(`${chalk.yellow('Starting up kinth-server:')} ./${path.relative(process.cwd(), this.directory)}`);
            console.log(`　http://localhost:${chalk.green(this.port)}`)
        })

        server.on("error", (err) => {
            if (err.code == 'EADDRINUSE') {
                server.listen(++this.port)
            }
        })
    }
}

module.exports = Server;