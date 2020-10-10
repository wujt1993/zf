const fs = require("fs");
const path = require("path");
const ReadStream = require("./ReadStream")
const WriteStream = require("./WriteStream")


// const rs = fs.createReadStream(path.resolve(__dirname, "2.png"));
// const ws = fs.createWriteStream(path.resolve(__dirname, "3.png"));
const rs = new ReadStream(path.resolve(__dirname, "note.txt"));
const ws = new WriteStream(path.resolve(__dirname, "xxx.txt"));

rs.pipe(ws);
ws.on("drain",function(){
    console.log("drain")
})