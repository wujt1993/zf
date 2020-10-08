
const path = require("path")
const fs = require("fs")
const ReadStream = require("./ReadStream")
/**
 * 1、new ReadStream(path, options)
 * 2、Readable.call(this, options); 继承Readable
 * 3、格式化参数
 * 4、_openReadFs(this);
 * 5、stream[kFs].open
 * 6、Readable stream.read() ->  this._read(state.highWaterMark);
 * 7、this.once('open', function() { this._read(n);});
 */
// const rs = fs.createReadStream(path.resolve(__dirname,"note.txt"), {
const rs = new ReadStream(path.resolve(__dirname,"note.txt"), {
    flags: "r",
    encoding: null,//默认为buffer
    mode: 438,//默认为438
    autoClose: true,//默认为true
    start: 0,
    end: 4,//包含4
    highWaterMark:2 //每次读2个字节，默认为64 * 1024
})


rs.on("open", function(fd) {
    console.log("open",fd)
})
let arr = []
rs.on("data", function(data){//utf8 编码，当只有一个字节的时候会转成ascii码： 1 -> 49 ->0x31
    arr.push(data)
    console.log("data",data)
    rs.pause();
    setTimeout(()=>{
        rs.resume()
    },1000)
})

rs.on("end", function(data){
    console.log("end",Buffer.concat(arr).toString())
})

rs.on("close", function(){
    console.log("close")
})

// console.log("1".charCodeAt())


