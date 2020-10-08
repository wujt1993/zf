const EventEmitter = require("events");
const path = require("path");
const fs = require("fs");
const { isBuffer } = require("util");
const { runInThisContext } = require("vm");

class WriteStream extends EventEmitter{

    constructor(path, options={}) {
        super(options);
        this.path = path;
        this.flags = options.flags || 'w';
        this.encoding = options.encoding || 'utf8';
        this.autoClose = options.autoClose || true;
        this.highWaterMark = options.highWaterMark || 16*1024;
        this.open();

        // 要判断是第一次写入 还是第二次写入
        this.writing = false; // 用来描述当前是否有正在写入的操作
        this.len = 0; // 需要的统计的长度
        this.needDrain= false;// 默认是否触发drain事件
        this.offset = 0; // 每次写入时的偏移量
        this.cache = []// 用来实现缓存的
    }


    open() {
        fs.open(this.path, this.flags, (err, fd) =>{
            if(err) {
                return this.emit("error", err)
            }
            this.fd = fd;
            this.emit("open", fd)
        })
    }

    write(chunk, encoding = this.encoding, cb = ()=>{}) {
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        this.len += chunk.length;
        let ret = this.len < this.highWaterMark;
        if(!ret) this.needDrain = true;
        if(this.writing) {
            this.cache.push({
                chunk,
                encoding,
                cb
            })
        }else {
            this.writing = true
            this._write(chunk,encoding, ()=>{
                cb()
                this.clearBuffer();
            })
        }
        return ret;
    }

    clearBuffer() {
        let data = this.cache.shift();
        if(data) {
            let {chunk, encoding, cb} = data
            this._write(chunk,encoding, ()=>{
                cb()
                this.clearBuffer();
            })
        }else{
            this.writing = false;
            
            if(this.needDrain) {
                this.needDrain = false;
                this.emit("drain");
            }
        }
    }

    _write(chunk, encoding, cb) {
        if(typeof this.fd !== 'number') {
            return this.once("open", ()=>{
                this._write(chunk,encoding, cb)
            })
        }

        fs.write(this.fd,chunk,0,chunk.length,this.offset,(err, written)=>{
            this.offset += written;
            this.len -= written;
            cb();
        })
    }
}

module.exports = WriteStream;