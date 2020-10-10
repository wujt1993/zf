const { timeStamp } = require("console");
const { EventEmitter } = require("events");
const fs = require("fs");
const path = require("path");
const { runInThisContext } = require("vm");


class WriteStream extends EventEmitter{
    
    constructor(path, options = {}) {
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.encoding = options.encoding || "utf8";
        this.mode = options.mode || 0o666;
        this.autoClose = options.autoClose === false ? false : true;
        this.end = options.end || undefined;
        this.start = options.start || 0;
        this.highWaterMark = options.highWaterMark || 16 * 1024;
        this.open();

        this.writing = false;//是否正在写入
        this.needDrain = false;//是否超出水平线
        this.len = 0;//累计内存中的数据个数
        this.position = this.start;//当前偏移量
        this.cache = [];//缓存要写入的数据
    }

    write(chunk, encoding = this.encoding, cb = ()=>{}) {
        if(!Buffer.isBuffer(chunk)) {
            chunk = Buffer.from(chunk)
        }
        this.len += chunk.length;
        let ret = this.len - this.highWaterMark < 0; 
        if(!ret) {
            this.needDrain = true;
        }
        
        if(this.writing) {
            this.cache.push({
                chunk,
                encoding,
                cb
            })
        }else {
            this.writing = true;
            this._write(
                chunk,
                encoding,
                ()=>{
                    cb();
                    this.clearBuffer();
                }
            )
        }
        return ret;
    }
    clearBuffer() {
        let data = this.cache.shift();
        if(data) {
            let {chunk, encoding, cb} = data;
            this._write(chunk, encoding, ()=>{
                cb();
                this.clearBuffer();
            });
        }else {
            this.writing = false;
            if(this.needDrain) {
                this.needDrain = false
                this.emit("drain")
            }
        }

    }
    open(){
        fs.open(this.path,this.flags,this.mode,(err,fd)=>{
            if(err) return this.emit('error',err);
            this.fd = fd;
            this.emit('open',fd);
        })
        
    }
    _write(chunk, encoding, cb) {
        if(typeof this.fd !== 'number') {
            return this.once("open",()=>{
                this._write(chunk, encoding, cb)
            })
        }

        fs.write(this.fd,chunk,0,chunk.length,this.position,(err, written)=>{
            this.len -= written;
            this.position += written;
            cb();
        })
    }
}

module.exports = WriteStream