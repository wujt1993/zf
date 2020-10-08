const { Readable } = require("stream");


class MyRead extends Readable{

    _read() {
        this.push("hello")
        this.push(null)
        console.log("ok")
    }
}


const mr = new MyRead();

mr.on("data", function(data){
    console.log(data)
})

mr.on("end", function() {
    console.log("end")
})