const EventEmitter = require("events")
const fs = require("fs")

class ReadStream extends EventEmitter{
    constructor(path, options={}){
        super();
        this.path = path;
        this.flags = options.flags || "r";
        this.encoding = options.encoding || null;
        this.mode = options.mode || 0o666;
        this.autoClose = options.autoClose === false ? false : true;
        this.start = options.start || 0;
        this.end = options.end || undefined;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.open();
        this.position = 0;
        this.flowing = false;
        this.on("newListener", (type)=>{
            if(type === "data") {
                this.flowing = true;
                if(this.flowing){
                    this.read();
                }
                
            }
        })
    }
    pause() {
        this.flowing = false
    }
    resume() {
        if(!this.flowing){
            this.flowing = true;
            this.read(); // 继续读取
        }
    }
    open() {
        fs.open(this.path,this.flags, this.mode, (err, fd) => {

            if(err) {
                return this.emit("err", err)
            }
            this.fd = fd;
            this.emit("open", fd);
           
        })
    }

    read() {
        if(typeof this.fd !== "number") {
            return this.once("open", ()=>{
                this.read();
            })
        }
        const buffer = Buffer.alloc(this.highWaterMark);
        const len = this.end ? Math.min((this.end - this.position + 1), this.highWaterMark) :this.highWaterMark;
        fs.read(this.fd, buffer, 0, len, this.position, (err, bytesRead)=>{
            if(bytesRead) {
                this.position += bytesRead;
                this.emit('data', buffer.slice(0, bytesRead));
                if(this.flowing){
                    this.read();
                }
                
            }else{
                this.emit("end");
                if(this.autoClose) {
                    fs.close(this.fd, ()=>{
                        this.emit("Close")
                    })
                }
            }
        })
    }

}

module.exports = ReadStream;