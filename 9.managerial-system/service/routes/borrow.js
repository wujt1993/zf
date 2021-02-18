let express = require("express");
let router = express.Router();
let { borrow } = require("../modules/handle");

router.post("/queryAllBookByPage", function (req, res) {
    let { name, pageSize, currentPage, category } = req.body;
    let startIndex = (currentPage - 1) * pageSize;
    borrow.queryAllBookByPage(req, res, name, category, startIndex, pageSize);
})

router.post("/apply", function (req, res) {
    let { bookId, startTime, endTime, remark } = req.body;
    let userId = req.session.user.id;
    borrow.apply(req, res, { bookId, userId, startTime, endTime, remark });
})
router.post("/renew", function (req, res) {
    let { id, endTime, remark } = req.body;
    borrow.renew(req, res, { id, endTime, remark });
})

router.post("/myApply", function (req, res) {
    let { state, pageSize, currentPage } = req.body;
    let userId = req.session.user.id;
    let startIndex = (currentPage - 1) * pageSize;
    borrow.myApply(req, res, state, userId, startIndex, pageSize);
})

router.post("/approval", function (req, res) {
    let { state, pageSize, currentPage } = req.body;
    let startIndex = (currentPage - 1) * pageSize;
    borrow.approval(req, res, state, startIndex, pageSize);
})

router.post("/handleApproval", function (req, res) {
    let { state, id, remark } = req.body;
    let userId = req.session.user.id;
    borrow.handleApproval(req, res, userId, state, id, remark);
})



module.exports = router;