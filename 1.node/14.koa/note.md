- koa 封装了http
- 核心方法 use 、 listen
- ctx是koa的上下文(req, res 原生的) request、response 是自己封装的

- 目录 application.js context.js request.js response.js
#### application.js
- 不能直接把request 赋值给context （每个应用应该是是独立的，互不影响）使用Object.create 继承
- createContext(req, res) => ctx 
- 每个use 的ctx 应该是独立的 
- middleware 存储中间件
- compose 返回promise
- 继承events 处理异常

#### request.js
- path
- query


#### context.js
- proto.__defineGeeter__('a', function(){return 100}) proto.a = 100


#### response.js
- body



#### 接收数据

- 读取数据： ctx.req.on('data', function(chunk){

}) 
- bodyparser 中间件，处理返回参数
