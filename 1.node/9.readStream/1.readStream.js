const fs = require("fs");
const path = require("path");
const ReadStream = require("./ReadStream")


// let rs = fs.createReadStream(path.resolve(__dirname, "note.txt"), {
let rs = new ReadStream(path.resolve(__dirname, "note.txt"), {
        flags: 'r',
        encoding: null,//默认buffer
        mode: 0o666,//默认0o666 -> 438
        autoClose: true,//默认true
        start: 0,
        // end: 4,//包含4
        highWaterMark: 2//每次读多少数据
    }
);

rs.on("error", function(err) {
    console.log("error..." + err)
})
rs.on("open", function(fd) {
    console.log("open...", fd)
})

let arr = []
rs.on("data", function(data) {//UTF-8编码中，一个字节的数据会转成ascii码， h -> 104 -> 0x68
    rs.pause();
    arr.push(data);
    console.log(data);
    setTimeout(()=>{
        rs.resume();
    },1000)
})

rs.on("end", function() {
    console.log("end...", Buffer.concat(arr).toString())
})

rs.on("close", function() {
    console.log("close")
})

// console.log("h".charCodeAt()) // 104 -> 0x68