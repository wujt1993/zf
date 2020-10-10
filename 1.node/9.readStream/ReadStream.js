const { EventEmitter } = require("events");
const fs = require("fs");
const path = require("path");


class ReadStream extends EventEmitter{
    constructor(path, options = {}) {
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.encoding = options.encoding || null;
        this.mode = options.mode || 0o666;
        this.autoClose = options.autoClose === false ? false : true;
        this.end = options.end || undefined;
        this.start = options.start || 0;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.open();
        this.position = this.start; 
        this.flowing = false;
        this.on("newListener", function(type) {
            if(type == "data") {
                this.read()
            }
        })
    }

    open() {
        fs.open(this.path,(err, fd)=>{
            if(err) {
                return this.emit("error", err)
            }
            this.fd = fd;
            this.emit("open", fd);
            this.flowing = true;
        })
    }
    pause() {
        this.flowing = false
    }
    resume() {
        if(!this.flowing) {
            this.flowing = true;
            this.read()
        }
    }
    read() {
        if(typeof this.fd !== "number") {
            return this.once("open", ()=>{
                this.read();
            })
        }
        const buffer = Buffer.alloc(this.highWaterMark)
        const len = this.end ? Math.min((this.end + 1 - this.position), this.highWaterMark) : this.highWaterMark
        fs.read(this.fd, buffer, 0, len, this.position,(err, bytesRead)=>{
            if(bytesRead) {
                this.position += bytesRead;
                this.emit("data", buffer);
                if(this.flowing) {
                    this.read();
                }
            }else{
                this.emit("end");
                if(this.autoClose) {
                    fs.close(this.fd, ()=>{
                        this.emit("close");
                    })  
                }
            }
        })
    }
}

module.exports = ReadStream;