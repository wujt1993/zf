let express = require("express");
let router = express.Router();
let {user} = require("../modules/handle");
const { v4: uuidv4 } = require('uuid');
const {md5Sign, md5Match} = require("../modules/md5");
const json = require("../modules/json")


router.post("/register", function(req, res) {
    let userInfo = req.body;
    user.findUserByWorkno(req, res,userInfo.workno,(item)=>{
        if(item.length !== 0) {
            json({res,code: 500, msg: '该用户已存在'})
            return 
        }
        userInfo.createUser = userInfo.name;
        userInfo.modifyUser = userInfo.name;
        userInfo.createTime = new Date();
        userInfo.modifyTime = new Date();
        userInfo.role = 0;
        userInfo.salt = uuidv4();
        userInfo.password = md5Sign(userInfo.password, userInfo.salt);
        user.register(req, res, userInfo)
    });
})

router.post("/login", function(req, res) {
    let userInfo = req.body;
    user.findUserByWorkno(req, res,userInfo.workno,(item)=>{
        if(item.length === 0) {
            json({res,code: 500, msg: '该用户或密码不正确'})
            return 
        }
        let dbUSer = item[0];
        let {salt, password} = dbUSer;
        let flag = md5Match(password, userInfo.password, salt);
        if(flag) {
            req.session.user = dbUSer;
            json({res, msg: '登录成功'})
        }else {
            json({res,code: 500, msg: '该用户或密码不正确'})
        }
    });
})

router.post("/resetPassword", function(req, res) {
    let {password, newPassword} = req.body;
    let {salt, password:oldPassword, id} = req.session.user
    let flag = md5Match(oldPassword, password, salt);
    if(!flag) {
        return json({res,code: 500, msg: '原密码不正确'})
    }
    newPassword = md5Sign(newPassword, salt);
    user.resetPassword(req, res, id, newPassword)
})

router.post("/reset", function(req, res) {
    let {id, salt} = req.body;
    let password = md5Sign('123456', salt);
    user.reset(req, res, id, password)
})

router.get("/logout", function(req, res) {
    req.session.destroy(function(err){
        console.log(err);
    })
    json({res, msg: '退出成功'})
})

router.get("/info", function(req, res) {
    let {role, name, workno} = req.session.user
    json({res, result: {role, name, workno}})
})

router.post('/queryByPage', function(req, res){
    let { name, workno, pageSize, currentPage} = req.body;
    let startIndex = (currentPage - 1) * pageSize;
    user.queryByPage(req, res,name, workno, startIndex ,pageSize);
})

router.post('/setRole', function(req, res){
    let { id, role, oldRole} = req.body;
    if(oldRole == 2) return json({res,code:500 ,msg: '不能修改超级管理员权限'});
    if(role != 0 && role !=1) return json({res,code:500 ,msg: '权限不准确'});
    user.setRole(req, res, id, role);
})

router.post('/delete', function(req, res){
    let { id} = req.body;
    user.delete(req, res, id);
})

router.post('/insert', function(req, res){
    let userInfo = req.body;
    user.findUserByWorkno(req, res,userInfo.workno,(item)=>{
        if(item.length !== 0) {
            json({res,code: 500, msg: '该用户已存在'})
            return 
        }
        userInfo.createUser = req.session.user.id;
        userInfo.modifyUser = req.session.user.id;
        userInfo.createTime = new Date();
        userInfo.modifyTime = new Date();
        userInfo.salt = uuidv4();
        userInfo.password = md5Sign('123456', userInfo.salt);
        user.register(req, res, userInfo)
    });
})

router.post('/update', function(req, res){
    let userInfo = req.body;
    userInfo.modifyUser = req.session.user.id;
    userInfo.modifyTime = new Date();
    user.update(req, res, userInfo)
})


module.exports = router;