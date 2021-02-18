//handel.js
/*
    数据增删改查模块封装
    req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
    req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
    req.body通常用来解析POST请求中的数据
     +req.query.id 可以将id转为整数
 */
// 引入mysql
var mysql = require('mysql');
// 引入mysql连接配置
var mysqlconfig = require('../config/mysql');
// 引入连接池配置
var poolextend = require('./poolextend');
// 引入SQL模块
var {bookSql, userSql, bookCategorySql,borrowSql} = require('./sql');
// 引入json模块
var json = require('./json');
// 使用连接池，提升性能
var pool = mysql.createPool(poolextend({}, mysqlconfig));

var borrow = {
    queryAllBookByPage: function(req, res, name, category ,startIndex, pageSize) {
        pool.getConnection(function(err, connection) {
            let userId = req.session.user.id;
            let params = [userId ,"%"+name+"%" , category ,startIndex - 0,pageSize-0];
            let sql = borrowSql.queryAllBookByPageAndCategoryTotal;
            let sql1 = borrowSql.queryAllBookByPageAndCategory;
            if(category == '') {
                params = [userId, "%"+name+"%" ,startIndex - 0,pageSize-0];
                sql = borrowSql.queryAllBookByPageTotal;
                sql1 = borrowSql.queryAllBookByPage;
            }
            connection.query(sql, params ,function(err, result) {
                let total = result[0].total;
                connection.query(sql1, params ,function(err, result) {

                    let list = result;
                    json({res, result:{
                        list, total
                    }});
                    connection.release();
                });
            });
        });
    },
    apply: function(req, res, info) {
        pool.getConnection(function(err, connection) {
            let {userId, bookId , startTime, endTime, remark} = info;
            let params = [userId, bookId, 0, new Date(), new Date(startTime), new Date(endTime), remark]
            connection.query(borrowSql.apply, params ,function(err, result) {
                json({res, msg: '申请成功', err, result});
            })
        })
    },
    renew: function(req, res, info) {
        pool.getConnection(function(err, connection) {
            let {id, endTime, remark} = info;
            let params = [5, new Date(endTime), remark, id];
            connection.query(borrowSql.renew, params ,function(err, result) {
                json({res, msg: '续借成功', err, result});
            })
        })
    },
    myApply: function(req, res, state, userId ,startIndex, pageSize) {
        pool.getConnection(function(err, connection) {
            let params = [userId ,state ,startIndex - 0,pageSize-0];
            let sql = borrowSql.queryMyApplyByPageAndStateTotal;
            let sql1 = borrowSql.queryMyApplyByPageAndState;
            if(state == '') {
                params = [userId,startIndex - 0,pageSize-0];
                sql = borrowSql.queryMyApplyByPageTotal;
                sql1 = borrowSql.queryMyApplyByPage;
            }
            connection.query(sql, params ,function(err, result) {
                let total = result[0].total;
                connection.query(sql1, params ,function(err, result) {
                    let list = result;
                    json({res, result:{
                        list, total
                    }});
                    connection.release();
                });
            });
        });
    },
    approval: function(req, res, state ,startIndex, pageSize) {
        pool.getConnection(function(err, connection) {
            let params = [state ,startIndex - 0,pageSize-0];
            let sql = borrowSql.queryApproveByPageAndStateTotal;
            let sql1 = borrowSql.queryApproveByPageAndState;
            if(state == '') {
                params = [startIndex - 0,pageSize-0];
                sql = borrowSql.queryApproveByPageTotal;
                sql1 = borrowSql.queryApproveByPage;
            }
            console.log(params)
            connection.query(sql, params ,function(err, result) {
                let total = result[0].total;
                connection.query(sql1, params ,function(err, result) {
                    let list = result;
                    json({res, result:{
                        list, total
                    }});
                    connection.release();
                });
            });
        });
    },
    handleApproval: function(req, res, userId, state, id, remark) {
        pool.getConnection(function(err, connection) {
            connection.query(borrowSql.handleApproval, [userId, state, remark, id], function(err, result) {
                json({res, msg: '新增成功', err, result});
                connection.release();
            });
        });
    },
}
var book = {
    insert: function(req, res, info) {
        pool.getConnection(function(err, connection) {
            connection.query(bookSql.insert, info, function(err, result) {
                json({res, msg: '新增成功', err, result});
                connection.release();
            });
        })
    },
    update: function(req, res, info) {
        pool.getConnection(function(err, connection) {
            connection.query(bookSql.update, info, function(err, result) {
                json({res, msg: '修改成功', err, result});
                connection.release();
            });
        })
    },
    queryByPage: function(req, res, name, category ,startIndex, pageSize) {
        pool.getConnection(function(err, connection) {
            let params = ["%"+name+"%" , category ,startIndex - 0,pageSize-0];
            let sql = bookSql.queryByPageAndCategoryTotal;
            let sql1 = bookSql.queryByPageAndCategory;
            if(!category) {
                params = ["%"+name+"%" ,startIndex - 0,pageSize-0];
                sql = bookSql.queryByPageTotal;
                sql1 = bookSql.queryByPage;
            }
            console.log(params)
            console.log(sql)
            connection.query(sql, params ,function(err, result) {
                let total = result[0].total;
                connection.query(sql1, params ,function(err, result) {
                    let list = result;
                    json({res, result:{
                        list, total
                    }});
                    connection.release();
                });
            });
            
        });
    },
    delete: function(req, res, id) {
        pool.getConnection(function(err, connection) {
            connection.query(bookSql.delete, [id] ,function(err, result) {
                json({res, msg: '删除成功'});
                connection.release();
            });
            
        });
    },
    findBookById: function(req, res,id,cb) {
        pool.getConnection(function(err, connection) {
            connection.query(bookSql.findBookById, [id], function(err, result) {
                if(err) {
                    json({res,err}); 
                }else {
                    cb(result)
                }
                connection.release();
            });
        })
    },
}
var bookCategory = {
    queryAll: function(req, res ) {
        pool.getConnection(function(err, connection) {
            connection.query(bookCategorySql.queryAll, [] ,function(err, result) {
                json({res, result});
                connection.release();
            });
            
        });
    },
    insert: function(req, res, info) {
        pool.getConnection(function(err, connection) {
            connection.query(bookCategorySql.insert, info, function(err, result) {
                json({res, msg: '新增成功', err, result});
                connection.release();
            });
        })
    },
    update: function(req, res, info) {
        pool.getConnection(function(err, connection) {
            connection.query(bookCategorySql.update, info, function(err, result) {
                json({res, msg: '更新成功', err, result});
                connection.release();
            });
        })
    },
    delete: function(req, res, id) {
        pool.getConnection(function(err, connection) {
            connection.query(bookCategorySql.delete, [id] ,function(err, result) {
                json({res, msg: '删除成功'});
                connection.release();
            });
            
        });
    }
}
var user = {
    register: function(req, res, user) {
        let {name, role, workno, password, salt, createUser, createTime, modifyUser, modifyTime} = user;
        pool.getConnection(function(err, connection) {
            connection.query(userSql.insert, [name, role, workno, password, salt, createUser, createTime, modifyUser, modifyTime], function(err, result) {
                json({res, msg: '新增成功', err, result});
                connection.release();
            });
        })
    },
    update: function(req, res, user) {
        let {name, role, id , modifyUser, modifyTime} = user;
        pool.getConnection(function(err, connection) {
            connection.query(userSql.update, [name, role, modifyUser, modifyTime, id], function(err, result) {
                json({res, msg: '修改成功', err, result});
                connection.release();
            });
        })
    },
    
    findUserByWorkno: function(req, res,workno,cb) {
        pool.getConnection(function(err, connection) {
            connection.query(userSql.findUserByWorkno, [workno], function(err, result) {
                if(err) {
                    json({res,err}); 
                }else {
                    cb(result)
                }
                connection.release();
            });
        })
    },
    queryAll: function(req, res) {
        pool.getConnection(function(err, connection) {
            connection.query(userSql.queryAll, function(err, result) {
                json({res, result});
                connection.release();
            });
        });
    },
    resetPassword: function(req, res, id, password) {
        pool.getConnection(function(err, connection) {
            connection.query(userSql.resetPassword, [password, id] ,function(err, result) {
                json({res, msg:'修改成功'});
                req.session.destroy(function(err){
                    console.log(err);
                })
                connection.release();
            });
        });
    },
    reset: function(req, res, id, password) {
        pool.getConnection(function(err, connection) {
            connection.query(userSql.resetPassword, [password, id] ,function(err, result) {
                json({res, msg:'重置成功'});
                connection.release();
            });
        });
    },
    queryByPage: function(req, res, name, workno,startIndex, pageSize ) {
        pool.getConnection(function(err, connection) {
            let params = ["%"+name+"%", "%"+workno+"%", startIndex - 0,pageSize-0];
            connection.query(userSql.queryByPageTotal, params ,function(err, result) {
                let total = result[0].total;
                connection.query(userSql.queryByPage, params ,function(err, result) {
                    let list = result;
                    json({res, result:{
                        list, total
                    }});
                    connection.release();
                });
            });
            
        });
    },
    setRole: function(req, res, id, role ) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.setRole, [role, id] ,function(err, result) {
                json({res, msg: '角色设置成功'});
                connection.release();
            });
            
        });
    },
    delete: function(req, res, id) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.delete, [id] ,function(err, result) {
                json({res, msg: '删除成功'});
                connection.release();
            });
            
        });
    }
};
exports.user = user;
exports.book = book;
exports.bookCategory = bookCategory;
exports.borrow = borrow;