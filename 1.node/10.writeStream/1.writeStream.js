const fs = require("fs");
const path = require("path");

const ws = fs.createWriteStream(path.resolve(__dirname, "note.txt"),{
    flags: 'w',
    encoding: null,
    mode: 0o666,
    autoClose: true,
    start: 0,
    highWaterMark: 2//默认为 16 * 1024
})

let flag = ws.write("123"); //只能传入字符串或buffer,当传入的数据大小超过highWaterMark时返回false

console.log(flag)

ws.end("end");//end之后不能对文件再进行写入的操作
// ws.write("@");
