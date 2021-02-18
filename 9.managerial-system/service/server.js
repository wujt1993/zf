let express = require("express");
let app = express();
let index = require("./routes/index");
let user = require("./routes/user");
let book = require("./routes/book");
let bookCategory = require("./routes/bookCategory");
let borrow = require("./routes/borrow");
let login = require("./routes/login");
let bodyParser = require('body-parser');
let json = require("./modules/json");
let session = require("express-session");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/upload',express.static('./upload'));

//配置中间件
app.use(session({
    secret: 'this is string key',   // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
    name:'sys_id',/*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
    resave: false,   /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
    saveUninitialized: true,   //强制将未初始化的 session 存储。  默认值是true  建议设置成true
    cookie: {
        maxAge:1000*30*60    /*过期时间*/
    },   /*secure https这样的情况才可以访问cookie*/
    //设置过期时间比如是30分钟，只要游览页面，30分钟没有操作的话在过期
    rolling:true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
}))

app.use(login);
app.use('/sys/',index);
app.use('/sys/user',user);
app.use('/sys/book',book);
app.use('/sys/bookCategory',bookCategory);
app.use('/sys/borrow',borrow);
app.use('*', function(req, res) {
    json({res, code: 404, msg: 'Not found'});
})
app.listen(3000);