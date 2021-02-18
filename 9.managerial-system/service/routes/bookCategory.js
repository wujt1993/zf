let express = require("express");
let router = express.Router();
let {bookCategory} = require("../modules/handle");

router.post('/queryAll', function(req, res){
    bookCategory.queryAll(req, res);
})

router.post("/insert", function(req, res) {
    let info = req.body;
    bookCategory.insert(req, res, [info.name, info.value])
})
router.post("/update", function(req, res) {
    let info = req.body;
    bookCategory.update(req, res, [info.name, info.value, info.id])
})

router.post('/delete', function(req, res){
    let { id} = req.body;
    bookCategory.delete(req, res, id);
})
module.exports = router;