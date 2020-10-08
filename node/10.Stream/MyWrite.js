const { Writable } = require("stream");

class MyWrite extends Writable{
    _write(chunk, enconding, cb){
        console.log(chunk);
        cb();//表示已经写完了
    }
}

let mw = new MyWrite();
mw.write("ok");
mw.write("ok");