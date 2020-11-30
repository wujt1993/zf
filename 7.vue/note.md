## Vue 核心原理

### 一、rollup 配置
- rollup： js 模块打包器
- rollup-plugin-serve：实现静态服务
- @babel/core：babel 核心模块
- @babel/preset-env: 将es6 转成es5
- rollup-plugin-babel: babel 与 rollup 桥梁
- cross-env：设置环境变量

### 二、Vue响应式原理

#### 1、导出Vue构造函数

#### 2、初始化vue (_init)
- vm.$options = options

#### 3、初始化数据 (initState)
- 数据来源：props 、 methods 、 data 、 computed 、watch
- initData(vm)

#### 4、数据劫持
```
    vue如果数据的层次过多 需要递归的去解析对象中的属性，依次增加set和get方法,因此vue2 性能较差
```
- 普通数据 （不做处理）
- 对象：遍历每个元素，增加set和get方法，进行对象属性劫持(defineReactive)
- 数组：不对索引劫持，对（push、pop、unshift、shift、splice、reserve、sort）方法及每个元素，进行对象属性劫持

#### 5、数据代理
- 将_data上的属性代理给 vm实例

### 三、模板编译
#### 1、页面挂载(vm.$mount(vm.$options.el))
- 是否有 options.render
- 没有options.render 通过 template = options.template || document.querySelector(options.el), 生成render 函数

#### 2、将template编译成render函数
```
    ast语法树：用对象描述原生语法信息
    虚拟dom：用对象描述dom节点信息
```
##### 1）解析template中标签和内容（不断截取template 直到template为空）
- 获取 '<' 的位置 textEnd
- textEnd == 0 ? 标签 ： 文本
- parseStartTag: 获取开始标签 tagName、attrs

##### 2）构建ast语法树
- start(tagName, attrs) 处理开始标签
- charts(text) 文本
- end(tagName) 处理结束标签

#### 3) 将ast语法树转成 render函数字符串
```
    <div style="color:red">hello {{name}} <span></span></div>
    render(){    
        return _c('div',{style:{color:'red'}},_v('hello'+_s(name)),_c('span',undefined,''))
    } 
```