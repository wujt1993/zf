let express = require('express');
let ignoreURL = require("../config/ignore");
let superURL = require("../config/super");
let adminURL = require("../config/admin");
let json = require("../modules/json");
//调用router方法得到一个路由中间件实例
let router = express.Router();
router.all("*", function(req,res,next){
    if(ignoreURL.indexOf(req.path) !== -1){
        next();
    }else {
        if(req.session && req.session.user){
            next();
        }else {
            json({res, code: '401', msg: '您暂未登录'})
        }
    }
})

router.all("*", function(req,res,next){
    if(superURL.indexOf(req.path) === -1){
        next();
    }else {
        if(req.session && req.session.user && req.session.user.role === 2){
            next();
        }else {
            json({res, code: '403', msg: '您暂无权限'})
        }
    }
})

router.all("*", function(req,res,next){
    if(adminURL.indexOf(req.path) === -1){
        next();
    }else {
        if(req.session && req.session.user && (req.session.user.role === 2 || req.session.user.role === 1)){
            next();
        }else {
            json({res, code: '403', msg: '您暂无权限'})
        }
    }
})


module.exports = router;
