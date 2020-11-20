## Vue 核心原理

### 一、rollup 配置
- rollup： js 模块打包器
- rollup-plugin-serve：实现静态服务
- @babel/core：babel 核心模块
- @babel/preset-env: 将es6 转成es5
- rollup-plugin-babel: babel 与 rollup 桥梁
- cross-env：设置环境变量

### 二、vue初始化操作
#### 1、数据劫持
```
vue2 使用 Object.defineProperty对数据劫持。 如果数据的层次过多 需要递归的去解析对象中的属性，依次增加set和get方法，因此vue2性能会差点
```
- 基本类型：不做处理
- 数组类型：监听会影响数组长度的方法， push、pop、unshift 、shift 、 splice 、sort 、reserve，（arr.lenght=10并不会检测到数组变化，vue3解决了这问题） 
- 对象类型：监听每个元素