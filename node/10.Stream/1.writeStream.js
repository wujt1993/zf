
const fs = require("fs");
const path = require("path");
const WriteStream = require("./WriteStream")

const ws = fs.createWriteStream(path.resolve(__dirname, "note.txt"),{
// const ws = new WriteStream(path.resolve(__dirname, "note.txt"),{
    flags: 'w',
    encoding: 'utf-8',
    autoClose: true,
    highWaterMark: 2//当写入的数据超过两个字节，ws.write将会返回false
})


ws.on("open", function(fd) {
    console.log("open",".............", fd)
})

let flag = ws.write("111", function(){
})
console.log("flag", flag)
ws.write("aaaa", function(){
})

ws.write("bbbb", function(){
})

let i = 0;

function write() {
    let flag = true;
    while(i < 10 && flag) {
        flag = ws.write("" + i++);
    }
}
write()

ws.on("drain", function() {
    write()
    console.log("清空")
})

// ws.end("ok")//只能关闭一次，但不传参数可以多调几次
// ws.end()