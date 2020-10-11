const http = require("http")
const url = require("url")
let server = http.createServer(function(req, res){
    // console.log('请求方式'+req.methods)
    // let {pathname, query} = url.parse(req.url,true);
    // console.log(pathname, query);
    // let arr = [];
    // req.on('data', function(chunk){
    //     console.log(chunk,"---------")
    //     arr.push(chunk);
    // })
    // req.on('end', function() {
    //     console.log(Buffer.concat(arr))
    // })

    res.statusCode = 600;
    res.statusMessage = 'no status';
    // res.write("ok");
    res.end("ok");
})

let port = 3000
server.listen(port, function(){
    console.log(`server start ${port}`)
})

server.on('error', function(err){
    if(err.code == 'EADDRINUSE'){
        server.listen(++port)
    }
})

