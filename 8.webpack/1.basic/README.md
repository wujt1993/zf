### 一、webpack介绍
#### 1、 安装
- npm install webpack webpack-cli

#### 2、入口
- entry: './src/index.js'
- entry: {main: 'xxx.js', main2: 'yyy.js'}

#### 3、输出
- output: {filename: 'main.js', path: path.resolve(__dirname, 'dist')}

#### 4、loader
- webpack 只能理解js和json 文件
- loader 能让webpack 处理其他类型文件，并将他们转换为有效模块，以供程序使用，并添加到依赖模块中

#### 5、插件
- loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量
- html-webpack-plugin： 用于生成html文件，并将js、css动态插入文件中


### 二、webpack开发环境配置

#### 1、安装服务器
- npm install webpack-dev-server

#### 2、支持css
- css-loader: 处理 url 和 @import
- style-loader: 将css插入html中

#### 3、支持less 和sass
- npm install node-sass sass-loader
- npm install less less-loader

#### 4、支持图片
- npm install file-loader 解决CSS等文件中的引入图片路径问题 
- npm install url-loader 可以将图片转成base64
- npm install html-loader html中可以加载目录中文件

```
    图片加载的方式
    1、静态目录文件引用
    2、require 、import 引用
    3、可以在CSS中通过 url 引入图片 css-loader来进行解析处理
```

#### 5、js兼容性（babel）
- babel-loader 使用Babel和webpack转译JavaScript文件
- @babel/core Babel编译的核心包
- @babel/preset-env 将es6+ 转成es5
```
    babel-loader 作用是调用babelCore
    1.先把ES6转成ES6语法树 babelCore
    2.然后调用预设preset-env把ES6语法树转成ES5语法树 preset-env
    3.再把ES5语法树重新生成es5代码 babelCore
```

- babel-polyfill ： Babel默认只转换新的javascript语法，而不转换新的API，因此需要引入babel-polyfill
- babel-runtime: Babel为了解决全局空间污染的问题，提供了单独的包babel-runtime用以提供编译模块的工具函数
```
    babel-runtime适合在组件和类库项目中使用，而babel-polyfill适合在业务项目中使用。
```
#### 6、环境变量配置
两个变量（process.env.NODE_ENV） 一个是在模块内部使用的变量(mode),一个是在node环境也就是webpack.config.js里面用的变量
##### 1）mode
- 默认值为production
- webpack.config.js 配置 mode
- package.json (优先级高)  --mode=development
- DefinePlugin 设置全局变量(优先级最高)

##### 2）node 环境下的 process.env.NODE_ENV
- cross-env NODE_ENV=development

##### 3）内部env
- --env用来设置webpack配置文件的函数参数

#### 7、sourcemap
- sourcemap是为了解决开发代码与实际运行代码不一致时帮助我们debug到原始开发代码的技术
```
    开发环境
    1.我们在开发环境对sourceMap的要求是：速度快，调试更友好
    2.要想速度快 推荐 eval-cheap-source-map
    3.如果想调试更友好 cheap-module-source-map
    4.折中的选择就是 eval-source-map

    生产环境
    1.首先排除内联，因为一方面我们了隐藏源代码，另一方面要减少文件体积
    2.要想调试友好 sourcemap>cheap-source-map/cheap-module-source-map>hidden-source-map/nosources-sourcemap
    3.要想速度快 优先选择cheap
    4.折中的选择就是 hidden-source-map
```

#### 8、引入第三方插件

- 直接引用 (比较麻烦，每次都要引)
- 通过插件引用（无法在全局下使用）
- 通过 expose-loader ，将插件暴露到全局作用域下
- externals : webpack打包时不加入(适用于有cdn引入的)
- html-webpack-externals-plugin: 自动引入外链cdn

#### 9、watch 自动编译

#### 10、拷贝文件copy-webpack-plugin

#### 11、清空文件夹

### 三、生产环境

#### 1、css 提取
- mini-css-extract-plugin

#### 2、css 兼容
- postcss-loader
- postcss-preset-env

#### 3、css、js、html 压缩
- optimize-css-assets-webpack-plugin是一个优化和压缩CSS资源的插件
- terser-webpack-plugin是一个优化和压缩JS资源的插件
- new HtmlWebpackPlugin({template: './src/index.html',minify: {  collapseWhitespace: true,removeComments: true}}),