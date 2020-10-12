
const http = require("http");


const server = http.createServer((req, res)=>{
    console.log("method:" + req.method + " <br>");
    console.log("url:" + req.url + " <br>");
    console.log(req.headers);
    res.setHeader("a","a");
    res.setHeader("b","b");
    res.statusCode = 302;
    res.statusMessage = 'cache'; 
    res.end("ok");
})

let port = '3000'
server.listen(port, function() {
    console.log(`server start ${port}`)
})

server.on('error', function(err) {
    if(err.code=='EADDRINUSE') {
        server.listen(++port)
    }
})
