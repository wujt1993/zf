let express = require('express');
//调用router方法得到一个路由中间件实例
let router = express.Router();
router.get("/", function(req,res){
    res.send('首页')
})

module.exports = router;
