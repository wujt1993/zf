#### rollup
- Rollup 是一个 JavaScript 模块打包器,可以将小块代码编译成大块复杂的代码， rollup.js更专注于Javascript类库打包 （开发应用时使用Wwebpack，开发库时使用Rollup）
- npm install @babel/preset-env @babel/core rollup rollup-plugin-babel rollup-plugin-serve -D
- @babel/core: babel 核心库
- rollup-plugin-babel： rollup 与 babel 连接桥梁
- @babel/preset-env： es6 -> es5
- rollup-plugin-serve：启动webpack服务

##### rollup 环境配置
- packagejs 
```
    "scripts": {
        "dev": "rollup -c -w"
    },
    -c : 读取rollup.config.js
    -w : 观察要打包文件的变动，并且在有变动时重新打包
```


#### vue
- vue 2.0 一个带配置信息参数的构造函数
##### 一、初始化参数
- 