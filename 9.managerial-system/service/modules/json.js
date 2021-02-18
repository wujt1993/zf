//json.js
//封装接送模块
var json = function({res, code=200, msg='ok' ,result = null, err=null}) {
    
    if(err) {
        res.json({
            code: 500,
            msg: '服务器错误' ,
            data: err
        });
    }else {
        res.json({
            code: code,
            msg: msg ,
            data: result
        });
    }
   
};
module.exports = json;