
const fs = require("fs");
const path = require("path");

const ws = fs.createWriteStream(path.resolve(__dirname, "note.txt"),{
    highWaterMark: 4//当写入的数据超过两个字节，ws.write将会返回false
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