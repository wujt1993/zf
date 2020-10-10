const { Readable } = require("stream");

class MyRead extends Readable {
    _read() {
        // console.log(11)
        this.push("test");//push方法是Readable中提供的 只要我们调用push将结果放入 就可以触发 on('data事件'
        this.push(null);// 放入null的时候就结束了
    }
}

const mr = new MyRead()

mr.on("data", function(data){
    console.log(data)
})
mr.on("end", function() {
    console.log("end")
})