
const fs = require("fs");
const path = require("path");

const ws = fs.createWriteStream(path.resolve(__dirname, "note.txt"),{
    flags: 'w',
    encoding: 'utf-8',
    autoClose: true,
    highWaterMark: 2//当写入的数据超过两个字节，ws.write将会返回false
})

ws.on("open", (fd)=>{
    console.log("open",fd)
})

//只能写入String 、buffer
let flag = ws.write("hello", function(){
    console.log("ok")
})
console.log(flag)