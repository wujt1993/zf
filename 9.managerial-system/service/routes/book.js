let express = require("express");
let router = express.Router();
let {book} = require("../modules/handle");
var multiparty = require('multiparty');

router.post("/insert", function(req, res) {
    var form = new multiparty.Form();
    form.uploadDir='upload'; //上传图片保存的地址     目录必须存在
    form.parse(req, function(err, fields, files) {
        //获取提交的数据以及图片上传成功返回的图片信息
        // console.log(fields.name);  /*获取表单的数据*/
        // console.log(files);  /*图片上传成功返回的信息*/
        let name = fields.name[0];
        let logo = files.logo ? files.logo[0].path: '';
        let author = fields.author[0];
        let category = fields.category[0];
        let bookno = fields.bookno[0];
        let location = fields.location[0];
        let introduction = fields.introduction[0];
        let ISBN = fields.ISBN[0];
        let count = fields.count[0] - 0;
        let createUser = req.session.user.id;
        let modifyUser = req.session.user.id;
        let createTime = new Date();
        let modifyTime = new Date();
        book.insert(req, res, [name, logo, author, category, bookno, location, introduction, ISBN, count, createUser, modifyUser, createTime, modifyTime])

    });
})

router.post('/queryByPage', function(req, res){
    let { name, pageSize, currentPage, category} = req.body;
    let startIndex = (currentPage - 1) * pageSize;
    book.queryByPage(req, res, name, category , startIndex, pageSize);
})

router.post('/update', function(req, res){
    var form = new multiparty.Form();
    form.uploadDir='upload'; //上传图片保存的地址     目录必须存在
    form.parse(req, function(err, fields, files) {
        let id = fields.id[0]
        book.findBookById(req, res,id,(item)=>{
            item = item[0] || {}
            let name = fields.name[0] || item.name;
            let logo = (files.logo && files.logo[0]) ? files.logo[0].path : item.logo;
            let author = fields.author[0] || item.author;
            let category = fields.category[0] || item.category;
            let bookno = fields.bookno[0] || item.bookno;
            let location = fields.location[0] || item.location;
            let introduction = fields.introduction[0] || item.introduction;
            let ISBN = fields.ISBN[0] || item.ISBN;
            let count = fields.count[0] - 0 || item.count;
            let modifyUser = req.session.user.id;
            let modifyTime = new Date();
            book.update(req, res, [name, logo, author, category, bookno, location, introduction, ISBN, count, modifyUser, modifyTime, id])
        });
    });
})


router.post('/delete', function(req, res){
    let { id} = req.body;
    book.delete(req, res, id);
})
module.exports = router;