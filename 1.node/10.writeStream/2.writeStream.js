const fs = require("fs");
const path = require("path");
const WriteStream = require("./WriteStream")

// const ws = fs.createWriteStream(path.resolve(__dirname, "note.txt"),{
const ws = new WriteStream(path.resolve(__dirname, "note.txt"),{
    flags: 'w',
    encoding: null,
    mode: 0o666,
    autoClose: true,
    start: 0,
    highWaterMark: 2//默认为 16 * 1024
})

// console.log(ws.write("hello world", function(){

// }));

let i = 0;
function write(){
    let flag = true;
    while(i < 10 && flag) {
        flag = ws.write(i++ + "");
    }
}

write();

//1、写入结束后才会执行，2、写入内容超过highWaterMark才会执行
ws.on("drain", function(){
    console.log("清空")
    write();
})
