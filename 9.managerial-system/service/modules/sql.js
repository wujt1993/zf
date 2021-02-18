//sql.js
// SQL语句封裝
let userSql = {
    queryByPageTotal: 'SELECT count(*) as total from sys_users where name like ? and workno like ? limit ?, ?',
    insert:'INSERT INTO sys_users(name, role, workno, password, salt, createUser, createTime, modifyUser, modifyTime) VALUES(?,?,?,?,?,?,?,?,?)',
    findUserByWorkno: 'SELECT * FROM sys_users where workno=? limit 1',
    resetPassword: 'update sys_users set password=? where id=? ',
    queryByPage: 'select * from sys_users where name like ? and workno like ? limit ?, ?',
    setRole: 'update sys_users set role=? where id=? ',
    delete: 'delete from sys_users where id=?',
    update: 'update sys_users set name= ?, role=?, modifyUser=?, modifyTime=? where id=? '
};

let bookSql = {
    insert: `
            INSERT INTO books (name, logo, author, category, bookno, location, introduction, ISBN, count, createUser, modifyUser, createTime, modifyTime) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
    queryByPageTotal: 'SELECT count(*) as total from books where name like ? limit ?, ?',
    queryByPageAndCategoryTotal: 'SELECT count(*) as total from books where name like ? and category=?  limit ?, ?',
    queryByPage: 'select * from books where name like ? limit ?, ?',  
    queryByPageAndCategory: 'select * from books where name like ? and category=? limit ?, ?',  
    delete: 'delete from books where id=?',
    findBookById: 'select * from books where id=?',
    update: `update books set name=?, logo=?, author=?, category=?, bookno=?, location=?, introduction=?, ISBN=?, count=?, modifyUser=?,modifyTime=? where id=?`
}
let bookCategorySql = {
    queryAll: 'select * from books_category',
    insert: `INSERT INTO books_category (name, value)  VALUES (?, ?); `,
    update: 'update books_category set name= ?, value=? where id=? ',
    delete: 'delete from books_category where id=?',
}
let borrowSql = {
    queryAllBookByPage: `select books.*, s.state, s.startTime, s.endTime 
                        from books left join (select * from sys_user_book where userId = ?) s on books.id = s.bookId 
                        where name like ? limit ?, ?
                        `,
    queryAllBookByPageAndCategory: `select books.*, s.state, s.startTime, s.endTime 
                                    from books left join (select * from sys_user_book where userId = ?) s on books.id = s.bookId 
                                    where name like ? and category=? limit ?, ?
                                    `,
    queryAllBookByPageTotal: `select count(*)  as total
                            from books left join (select * from sys_user_book where userId = ?) s on books.id = s.bookId 
                            where name like ?
                            `,
    queryAllBookByPageAndCategoryTotal: `select count(*)  as total
                                        from books left join (select * from sys_user_book where userId = ?) s on books.id = s.bookId 
                                        where name like ? and category=?
    `,
    apply: 'INSERT INTO sys_user_book (userId, bookId, state, createTime, startTime, endTime, remark) VALUES (?, ?, ?, ?, ?, ?, ?);',
    renew: 'update sys_user_book set state=?, endTime=?, remark=? where id=?',
    queryMyApplyByPage: `
        select books.*, s.state, s.startTime, s.endTime , s.remark, s.id sId
        from (select * from sys_user_book where userId = ?) s left join books on books.id = s.bookId 
        limit ?, ?
    `,
    queryMyApplyByPageTotal: `
        select count(*)  as total
        from (select * from sys_user_book where userId = ?) s left join books on books.id = s.bookId 
    `,
    queryMyApplyByPageAndState: `
        select books.*, s.state, s.startTime, s.endTime, s.remark, s.id sId 
        from (select * from sys_user_book where userId = ?) s left join books on books.id = s.bookId 
        where s.state = ? limit ?, ?
    `,
    queryMyApplyByPageAndStateTotal: `
        select count(*)  as total
        from (select * from sys_user_book where userId = ?) s left join books on books.id = s.bookId 
        where s.state = ?
    `,
    queryApproveByPageAndStateTotal: `
        select count(*) as total from sys_user_book s where s.state = ?
    `,
    queryApproveByPageAndState: `
        select s.state, s.startTime, s.endTime, s.userId, s.bookId, s.id, s.remark,
        b.name bookName, su.name userName, 
        (select sus.name from sys_users sus where s.userId = sus.id) modifyUser
        from sys_user_book s
        left join books b on s.bookId = b.id
        left join sys_users su on s.userId = su.id
        where s.state = ? limit ?, ?
    `,
    queryApproveByPageTotal: `
        select count(*) as total from sys_user_book
    `,
    queryApproveByPage: `
        select s.state, s.startTime, s.endTime, s.userId, s.bookId, s.id, s.remark,
        b.name bookName, su.name userName, 
        (select sus.name from sys_users sus where s.modifyUser = sus.id) modifyUser
        from sys_user_book s
        left join books b on s.bookId = b.id
        left join sys_users su on s.userId = su.id
        limit ?, ?
    `,
    handleApproval: 'update sys_user_book set modifyUser=?, state=?, remark=? where id=?'
}
module.exports = {
    userSql,
    bookSql,
    bookCategorySql,
    borrowSql
};