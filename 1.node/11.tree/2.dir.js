const fs = require("fs");
const path = require("path");

//只能创建一层目录
// fs.mkdir(path.resolve(__dirname,"dir"), function(err){
//     if(err) throw err;
// })

//只能删除文件
// fs.unlink(path.resolve(__dirname,"a/b/b.txt"), function(err){
//     if(err) throw Error(err);
// })

//只能删除空的文件夹
// fs.rmdir(path.resolve(__dirname,"a/b"), function(err){
//     if(err) throw Error(err);
// })

//创建文件,只能在当前目录创建
// fs.open(path.resolve(__dirname,"a/a.txt"),'w', 0o666, (err, fd)=>{
//     fs.close(fd,()=>{
//         console.log("文件创建成功");
//     });
// })

function mkdirs(pathName,callback) {
    if(fs.existsSync(pathName)){
        callback();
    }else {
        mkdirs(path.dirname(pathName), ()=>{
            fs.mkdir(pathName,callback)
        })
    }
}

// mkdirs(path.resolve(__dirname,"a/b/b/d/e/1.js"), ()=>{
//     console.log("创建成功")
// })

function mkFiles(pathName, callback) {
    mkdirs(path.dirname(pathName),()=>{
        fs.open(pathName,'w',0o666, (err,fd)=>{
            if(err) throw Error(err)
            fs.close(fd,()=>{
                callback()
            })
        })
    })
}

// mkFiles(path.resolve(__dirname,"a/b/d/2.xlsx"), ()=>{
//      console.log("创建成功")
// })

//只能查看当前目录的文件名
// fs.readdir(path.resolve(__dirname,"a"),(err, files)=>{
//     if(err) throw Error(err)
//     console.log(files)
// })

function readdirs(dirname) {
    // console.log(dirname)
    fs.readdir(dirname, (err, files)=>{
        if(err) throw Error(err);
        if(files.length == 0) {
            console.log(dirname);
        }
        files.map(item=>{
            let filename = path.join(dirname,item);
            fs.stat(filename,(err, stats)=>{
                if(stats.isDirectory()){
                    readdirs(filename)
                }else {
                    console.log(filename)
                }
            })
        })
    })
}
// readdirs(path.resolve(__dirname,"a"))

//删除文件夹， 只能删除空的文件夹
// fs.rmdir(path.resolve(__dirname, "dir"),(err)=>{
//     if(err) throw Error(err)
// })

//删除文件
// fs.unlink(path.resolve(__dirname, "dir/1.js"),(err)=>{
//     if(err) throw Error(err)
// })


function rmdirs(dir,cb){ // 用我们的层序遍历来实现删除操作
    fs.stat(dir,(err,statObj)=>{
        if(statObj.isFile()){
            fs.unlink(dir,cb);
        }else{
            // 读取文件夹中的内容 
            fs.readdir(dir,(err,dirs)=>{
                dirs = dirs.map(item=>path.join(dir,item));
                let idx = 0;
                function next(){
                    if(idx == dirs.length) return fs.rmdir(dir,cb);
                    let current = dirs[idx++];
                    rmdirs(current,next)
                }
                next();
            })
        }
    });
}

rmdirs(path.resolve(__dirname, "a"),()=>{
    console.log("删除成功")
})