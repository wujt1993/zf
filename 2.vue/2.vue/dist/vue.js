(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

    function genProps(attrs) {
      let str = '';

      for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i];

        if (attr.name == "style") {
          let obj = {};
          attr.value.split(';').forEach(item => {
            if (item) {
              let [key, value] = item.split(':');
              obj[key] = value;
            }
          });
          attr.value = obj;
        }

        str += `${attr.name}:${JSON.stringify(attr.value)},`;
      }

      return `{${str.slice(0, -1)}}`;
    }

    function gen(node) {
      if (node.type == 1) {
        return generate(node);
      } else {
        let text = node.text;

        if (defaultTagRE.test(text)) {
          let tokens = [];
          let match;
          let index = 0;
          let lastIndex = defaultTagRE.lastIndex = 0;

          while (match = defaultTagRE.exec(text)) {
            // aa {{ age }} haha 
            index = match.index;

            if (index > lastIndex) {
              tokens.push(JSON.stringify(text.slice(lastIndex, index)));
            }

            tokens.push(`_s(${match[1].trim()})`);
            lastIndex = index + match[0].length;
          }

          if (lastIndex < text.length) {
            tokens.push(JSON.stringify(text.slice(lastIndex)));
          }

          return `_v(${tokens.join('+')})`;
        } else {
          return `_v(${JSON.stringify(text)})`;
        }
      }
    }

    function genChildren(el) {
      const children = el.children;

      if (children) {
        return children.map(child => gen(child)).join(',');
      }
    }

    function generate(el) {
      let children = genChildren(el);
      let code = `_c('${el.tag}',${el.attrs.length != 0 ? genProps(el.attrs) : 'undefined'}${children ? ',' + children : ''})`;
      return code;
    }
    /**
     * 将字符串 转成可运行的js
     * <div id="app" a=1 b ="2">
     *    hello 
     *    <div style="color: red">
     *         <span>! {{ name}} !</span>
     *    </div>
     * </div>
     * _c('div',{id:'app',a:1,b:'2'},
     *      _v("hello"),
     *      _c('div', {style:{color: 'red}}, 
     *          _c('span',undefined, 
     *              _v('!' + _s(name) + '!')
     *          )
     *      )
     * )
     */

    const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // aa-aa 

    const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //aa:aa

    const startTagOpen = new RegExp(`^<${qnameCapture}`); // 可以匹配到标签名  [1]

    const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); //[0] 标签的结束名字
    //    style="xxx"   style='xxx'  style=xxx

    const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
    const startTagClose = /^\s*(\/?)>/;
    function parseHTML(html) {
      let root;
      let currentParent;
      let stack = [];

      function createASTElement(tag, attrs) {
        return {
          tag,
          attrs,
          type: 1,
          children: [],
          parent: null
        };
      }

      function start(tagName, attrs) {
        let node = createASTElement(tagName, attrs);

        if (root == null) {
          root = node;
        }

        currentParent = node;
        stack.push(node);
      }

      function end(tagName) {
        let node = stack.pop();

        if (node.tag != tagName) {
          throw Error("解析报错");
        }

        currentParent = stack[stack.length - 1];

        if (currentParent) {
          node.parent = currentParent;
          currentParent.children.push(node);
        }
      }

      function chars(text) {
        text = text.replace(/\s/g, "");

        if (text) {
          currentParent.children.push({
            text,
            type: 3
          });
        }
      }

      function advance(n) {
        html = html.substring(n);
      }

      function parseStartTag() {
        let start = html.match(startTagOpen);

        if (start) {
          let match = {
            tagName: start[1],
            attrs: []
          };
          advance(start[0].length);
          let end, attr;

          while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            match.attrs.push({
              name: attr[1],
              value: attr[3] || attr[4] || attr[5] || true
            });
            advance(attr[0].length);
          }

          if (end) {
            advance(end[0].length);
            return match;
          }
        }
      }

      while (html) {
        let textEnd = html.indexOf("<");

        if (textEnd == 0) {
          //标签
          let startTagMatch = parseStartTag();

          if (startTagMatch) {
            start(startTagMatch.tagName, startTagMatch.attrs);
            continue;
          }

          let endTagMatch = html.match(endTag);

          if (endTagMatch) {
            advance(endTagMatch[0].length);
            end(endTagMatch[1]);
            continue;
          }
        }

        if (textEnd > 0) {
          //文本
          let text = html.substring(0, textEnd);
          advance(text.length);
          chars(text);
        }
      }

      return root;
    }

    function compileToFunctions(template) {
      //获取ast树
      let ast = parseHTML(template); //获得可运行的render函数

      let code = generate(ast);
      let render = `with(this){return ${code}}`;
      let fn = new Function(render);
      return fn;
    } // function a(){
    //     with(this) {
    //         console.log(b)
    //     }
    // }
    // a.call({b:1}) // 1

    let callbacks = [];
    let waiting = false;

    function flushCallbacks() {
      for (let i = 0; i < callbacks.length; i++) {
        let callback = callbacks[i];
        callback();
      }

      waiting = false;
      callbacks = [];
    }

    function nextTick(cb) {
      callbacks.push(cb);

      if (!waiting) {
        waiting = true; // 1.promise先看支持不支持 
        // 2.mutationObserver
        // 3.setImmdiate
        // 4.setTimeout  Vue3 next-tick就直接用了promise

        return Promise.resolve().then(flushCallbacks);
      }
    } //vue 的生命周期函数

    let strats = {};
    let LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted' //....
    ];

    function mergeHook(parentVal, childVal) {
      if (childVal) {
        if (parentVal) {
          return parentVal.concat(childVal);
        } else {
          return [childVal];
        }
      } else {
        return parentVal;
      }
    }

    LIFECYCLE_HOOKS.forEach(hook => {
      strats[hook] = mergeHook;
    });

    strats.components = function (parentVal, childVal) {
      const res = Object.create(parentVal);

      if (childVal) {
        for (let key in childVal) {
          res[key] = childVal[key];
        }
      }

      return res;
    };

    function isObject(val) {
      return typeof val === 'object' && val !== null;
    }
    function mergeOptions(parent, child) {
      let options = {};

      for (let key in parent) {
        mergeField(key);
      }

      for (let key in child) {
        if (parent.hasOwnProperty(key)) continue;
        mergeField(key);
      }

      function mergeField(key) {
        if (strats[key]) {
          return options[key] = strats[key](parent[key], child[key]);
        }

        if (isObject(parent[key])) {
          options[key] = { ...parent[key],
            ...child[key]
          };
        } else {
          if (child[key]) {
            options[key] = child[key];
          } else {
            options[key] = parent[key];
          }
        }
      }

      return options;
    }

    function makeUp(str) {
      let map = {};
      str.split(",").forEach(item => {
        map[item] = true;
      });
      return tag => map[tag] || false;
    }

    const isReservedTag = makeUp('div,ul,li,p,h1,h2,h3,h4,h5,h6,table,input,button,em,i,span,a');

    function initGlobalAPI(Vue) {
      Vue.options = {};

      Vue.mixin = function (mixin) {
        this.options = mergeOptions(this.options, mixin);
        return this;
      };

      Vue.options._base = Vue;
      Vue.options.components = {};

      Vue.component = function (id, definition) {
        definition.name = definition.name || id;
        definition = this.options._base.extend(definition);
        Vue.options.components[id] = definition;
      };

      let cid = 0;

      Vue.extend = function (options) {
        const Super = this;

        const Sub = function VueComponent(options) {
          this._init(options);
        };

        Sub.cid = cid++;
        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.component = Super.component;
        Sub.options = mergeOptions(Super.options, options);
        return Sub;
      };
    }

    let id = 0;

    class Dep {
      constructor() {
        this.id = id++;
        this.subs = [];
      }

      depend() {
        Dep.target.addDep(this); //让每个watcher 记住dep
      }

      addSub(watcher) {
        this.subs.push(watcher);
      }

      notify() {
        this.subs.forEach(watcher => {
          watcher.update();
        });
      }

    }

    Dep.target = null;
    function pushTarget(watcher) {
      Dep.target = watcher;
    }
    function popTarget() {
      Dep.target = null;
    }

    let has = {};
    let queue = [];
    let pending = false;

    function flushSchedularQueue() {
      for (let i = 0; i < queue.length; i++) {
        let watcher = queue[i];
        watcher.run();
      }

      has = {};
      queue = [];
      pending = false;
    }

    function queueWatcher(watcher) {
      let id = watcher.id;

      if (!has[id]) {
        has[id] = true;
        queue.push(watcher);

        if (!pending) {
          pending = true;
          nextTick(flushSchedularQueue);
        }
      }
    }

    let id$1 = 0;

    class Watcher {
      constructor(vm, exprOrFn, cb, options) {
        this.vm = vm;
        this.cb = cb;
        this.options = options;
        this.id = id$1++;
        this.getter = exprOrFn;
        this.deps = [];
        this.depsId = new Set();
        this.get(); // 调用传入的函数， 调用了render方法， 此时会对模板中的数据进行取值
      }

      get() {
        //当页面渲染时，注册一个watcher
        pushTarget(this);
        this.getter();
        popTarget();
      }

      addDep(dep) {
        let id = dep.id;

        if (!this.depsId.has(id)) {
          this.deps.push(dep);
          this.depsId.add(id);
          dep.addSub(this);
        }
      }

      run() {
        this.get();
      }

      update() {
        queueWatcher(this);
      }

    }

    function createElement(vm, tag, data = {}, ...children) {
      if (isReservedTag(tag)) {
        return vnode(vm, tag, data, data.key, children, undefined);
      } else {
        const Ctor = vm.$options.components[tag];
        return createComponent(vm, tag, data, data.key, children, undefined, Ctor);
      }
    }

    function createComponent(vm, tag, data, key, children, text, Ctor) {
      if (isObject(Ctor)) {
        Ctor = vm.$options._base.extend(Ctor);
      }

      data.hook = {
        init(vnode) {
          // 调用子组件的构造函数
          let child = vnode.componentInstance = new vnode.componentOptions.Ctor({});
          child.$mounted(); // 手动挂在  vnode.componentInstance.$el = 真实的元素
        }

      };
      return vnode(vm, `vue-compontent-${Ctor.cid}-${tag}`, data, key, undefined, undefined, {
        Ctor
      });
    }

    function createTextVnode(vm, text) {
      return vnode(vm, undefined, undefined, undefined, undefined, text);
    }

    function vnode(vm, tag, data, key, children, text, componentOptions) {
      return {
        vm,
        tag,
        data,
        key,
        children,
        text,
        componentOptions
      };
    }

    function isSameVnode(oldVnode, newVNode) {
      return oldVnode.tag === newVNode.tag && oldVnode.key === newVNode.key;
    }

    function patch(oldVnode, vnode) {
      // oldVnode 是一个真实的元素
      //1、组件
      if (!oldVnode) {
        return createElm(vnode); // 根据虚拟节点创建元素
      }

      const isRealElement = oldVnode.nodeType; //2、初次渲染

      if (isRealElement) {
        // 初次渲染
        const oldElm = oldVnode; // id="app"

        const parentElm = oldElm.parentNode; // body

        let el = createElm(vnode);
        parentElm.insertBefore(el, oldElm.nextSibling); // 将创建的节点查到原有的节点的下一个

        parentElm.removeChild(oldElm);
        return el; // vm.$el
      } else {
        //3、数据更新渲染
        // diff算法
        //1、当标签名不同，直接将旧的元素替换成新的元素
        if (oldVnode.tag !== vnode.tag) {
          return oldVnode.el.parentElement.replaceChild(createElm(vnode), oldVnode.el);
        } //2、标签一样，但文本不一样


        if (!oldVnode.tag) {
          if (oldVnode.text !== vnode.text) {
            oldVnode.el.textContent = vnode.text;
          }
        } //3、属性不一样


        let el = vnode.el = oldVnode.el;
        updateProperties(vnode, oldVnode.data); //4、更新子元素

        let oldChildren = oldVnode.children || [];
        let newChildren = vnode.children || [];

        if (oldChildren.length > 0 && newChildren.length > 0) {
          updateChildren(el, oldChildren, newChildren);
        } else if (oldChildren.length > 0) {
          oldVnode.el.innerHTML = "";
        } else if (newChildren.length > 0) {
          newChildren.forEach(child => {
            oldVnode.el.appendChild(createElm(child));
          });
        }
      }
    }

    function updateChildren(parent, oldChildren, newChildren) {
      let oldStartIndex = 0;
      let oldEndInex = oldChildren.length - 1;
      let oldStartVnode = oldChildren[oldStartIndex];
      let oldEndVnode = oldChildren[oldEndInex];
      let newStartIndex = 0;
      let newEndIndex = newChildren.length - 1;
      let newStartVnode = newChildren[newStartIndex];
      let newEndVnode = newChildren[newEndIndex];
      let map = makeIndexByKey(oldChildren);

      function makeIndexByKey(oldChildren) {
        let map = {};
        oldChildren.forEach((item, index) => {
          map[item.key] = index;
        });
        return map;
      }

      while (oldStartIndex <= oldEndInex && newStartIndex <= newEndIndex) {
        if (!oldStartVnode) {
          oldStartVnode = oldChildren[++oldStartIndex];
        } else if (!oldEndVnode) {
          oldEndVnode = oldChildren[--oldEndIndex];
        } else if (isSameVnode(oldStartVnode, newStartVnode)) {
          //新的头指针和旧的头指针相同，头指针加一
          patch(oldStartVnode, newStartVnode);
          oldStartVnode = oldChildren[++oldStartIndex];
          newStartVnode = newChildren[++newStartIndex];
        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
          //新的尾指针指针和旧的尾指针相同，尾指针减一
          patch(oldEndVnode, newEndVnode);
          oldEndVnode = oldChildren[--oldEndInex];
          newEndVnode = newChildren[--newEndIndex];
        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
          //旧的头指针和新的尾指针相同，旧的头指针加一，新的尾指针减一，将旧的头指针元素移动到旧的尾指针的元素后面
          patch(oldStartVnode, newEndVnode);
          parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
          oldStartVnode = oldChildren[++oldStartIndex];
          newEndVnode = newChildren[--newEndIndex];
        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
          //旧的尾指针和新的头指针相同，旧的尾指针减一，新的头指针加一，将旧的尾指针元素移动到旧的头指针的元素前面
          patch(oldStartVnode, newEndVnode);
          parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
          oldStartVnode = oldChildren[++oldStartIndex];
          newEndVnode = newChildren[--newEndIndex];
        } else {
          let moveIndex = map[newStartVnode.key];

          if (!moveIndex) {
            parent.insertBefore(createElm(newStartVnode), oldStartVnode.el);
          } else {
            let moveVnode = oldChildren[moveIndex];
            oldChildren[moveIndex] = undefined;
            patch(moveVnode, newStartVnode); // 如果找到了 需要两个虚拟节点比对

            parent.insertBefore(moveVnode.el, oldStartVnode.el);
          }

          newStartVnode = newChildren[++newStartIndex];
        }
      }

      for (let i = oldStartIndex; i <= oldEndInex; i++) {
        let child = oldChildren[i];

        if (child) {
          parent.removeChild(child.el);
        }
      }

      for (let i = newStartIndex; i <= newEndIndex; i++) {
        // 向前插入 向后插入
        // 看一眼newEndIndex 下一个节点有没有值
        let nextEle = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el; // appendChild 和 insertBefore 也可以进行合并
        // 如果insertBefore 传入null 等价于appendChild

        parent.insertBefore(createElm(newChildren[i]), nextEle); // parent.appendChild(createElm(newChildren[i]));
      }
    }

    function createComponent$1(vnode) {
      let i = vnode.data;

      if ((i = i.hook) && (i = i.init)) {
        i(vnode);
      }

      if (vnode.componentInstance) {
        // 如果虚拟节点上有组件的实例说明当前这个vode是组件
        return true;
      }

      return false;
    }
    function createElm(vnode) {
      // 根据虚拟节点创建真实的节点
      let {
        tag,
        children,
        key,
        data,
        text,
        vm
      } = vnode;

      if (typeof tag === 'string') {
        // 可能是组件
        if (createComponent$1(vnode)) {
          // 如果返回true 说明这个虚拟节点是组件
          // 如果是组件，就将组件渲染后的真实元素给我
          return vnode.componentInstance.$el;
        }

        vnode.el = document.createElement(tag); // 用vue的指令时 可以通过vnode拿到真实dom

        updateProperties(vnode);
        children.forEach(child => {
          // 如果有儿子节点，就进行递归操作
          vnode.el.appendChild(createElm(child));
        });
      } else {
        vnode.el = document.createTextNode(text);
      }

      return vnode.el;
    }

    function updateProperties(vnode, oldProps = {}) {
      let newProps = vnode.data || {}; // 属性

      let el = vnode.el; // dom元素

      for (let key in oldProps) {
        if (!newProps[key]) {
          el.removeAttribute(key);
        }
      }

      let newStyle = newProps.style || {}; // {color:blue}

      let oldStyle = oldProps.style || {}; // {background:red}

      for (let key in oldStyle) {
        // 判断样式根据 新老先比对一下
        if (!newStyle[key]) {
          el.style[key] = '';
        }
      }

      for (let key in newProps) {
        if (key == 'style') {
          for (let styleName in newProps.style) {
            el.style[styleName] = newProps.style[styleName];
          }
        } else if (key === 'class') {
          el.className = newProps.class;
        } else {
          el.setAttribute(key, newProps[key]);
        }
      }
    }

    function lifecycleMixin(Vue) {
      Vue.prototype._update = function (vnode) {
        const vm = this; // 第一次初始化 第二次走diff算法

        const prevVnode = vm._vnode; // 先取上一次的vnode 看一下是否有

        vm._vnode = vnode; // 保存上一次的虚拟节点

        if (!prevVnode) {
          vm.$el = patch(vm.$el, vnode); // 组件调用patch方法会产生$el属性
        } else {
          vm.$el = patch(prevVnode, vnode);
        }
      };
    }
    function callHook(vm, hook) {
      let handlers = vm.$options[hook];

      if (handlers) {
        handlers.forEach(handler => {
          handler.call(vm);
        });
      }
    } //组件挂载

    function mountComponent(vm) {
      // 默认vue是通过watcher来进行渲染  = 渲染watcher （每一个组件都有一个渲染watcher）
      let updateComponent = () => {
        let vnode = vm._render(); //生成虚拟节点


        vm._update(vnode); //将虚拟节点转为真实节点

      };

      new Watcher(vm, updateComponent, () => {}, true); // updateComponent();
    }

    let oldArrayMethods = Array.prototype;
    let arrayMethods = Object.create(Array.prototype);
    let methods = ['push', 'pop', 'unshift', 'shift', 'splice', 'reserve', 'sort'];
    methods.forEach(method => {
      arrayMethods[method] = function (...args) {
        let res = oldArrayMethods[method].call(this, ...args);
        let ob = this.__ob__;
        let inserted;

        switch (method) {
          case 'push':
          case 'unshift':
            inserted = args;
            break;

          case 'splice':
            inserted = args.slice(2);
        } // console.log(`调用了数组${method}方法`);


        if (inserted) ob.observeArray(inserted);
        ob.dep.notify();
        return res;
      };
    });

    class Observer {
      constructor(value) {
        Object.defineProperty(value, "__ob__", {
          configurable: false,
          enumerable: false,
          value: this
        });
        this.dep = new Dep(); // 给数组本身和对象本身增加一个dep属性

        if (Array.isArray(value)) {
          //监听删除、添加、排序、反转元素的方法
          Object.setPrototypeOf(value, arrayMethods);
          this.observeArray(value);
        } else {
          this.walk(value);
        }
      }

      observeArray(value) {
        for (let i = 0, len = value.length; i < len; i++) {
          observe(value[i]);
        }
      }

      walk(data) {
        Object.keys(data).forEach(key => {
          defineReactive(data, key, data[key]);
        });
      }

    }

    function dependArray(value) {
      // 就是让里层数组收集外层数组的依赖，这样修改里层数组也可以更新视图 
      for (let i = 0; i < value.length; i++) {
        let current = value[i];
        current.__ob__ && current.__ob__.dep.depend(); // 让里层的和外层收集的都是同一个watcher

        if (Array.isArray(current)) {
          dependArray(current);
        }
      }
    }

    function defineReactive(data, key, value) {
      let childOb = observe(value);
      let dep = new Dep(); // 每次都会给属性创建一个dep

      Object.defineProperty(data, key, {
        get() {
          if (Dep.target) {
            dep.depend(); // 让这个属性自己的dep记住这个watcher，也要让watcher记住这个dep

            if (childOb) {
              // 如果对数组取值 会将当前的watcher和数组进行关联
              childOb.dep.depend();

              if (Array.isArray(value)) {
                dependArray(value);
              }
            }
          }

          return value;
        },

        set(newValue) {
          if (newValue === value) return;
          value = newValue;
          observe(newValue);
          dep.notify(); // 通知dep中记录的watcher让它去执行
        }

      });
    }

    function observe(data) {
      if (typeof data !== 'object' || data === null) {
        return;
      }

      if (data.__ob__) {
        // 放置循环引用了
        return;
      }

      return new Observer(data);
    }

    function initState(vm) {
      const opts = vm.$options;

      if (opts.data) {
        initData(vm);
      }
    }

    function proxy(target, source, key) {
      Object.defineProperty(target, key, {
        get() {
          return target[source][key];
        },

        set(newValue) {
          target[source][key] = newValue;
        }

      });
    }

    function initData(vm) {
      let data = vm.$options.data;
      data = vm._data = typeof data === 'function' ? data() : data;

      for (let key in data) {
        //将data上的数据挂载到vm上
        proxy(vm, '_data', key);
      }

      observe(data);
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        let vm = this;
        vm.$options = mergeOptions(vm.constructor.options, options); //初始化状态

        callHook(vm, 'beforeCreate');
        initState(vm);
        callHook(vm, 'created');

        if (vm.$options.el) {
          //获取要渲染的模板
          this.$mounted(vm.$options.el);
        }
      };

      Vue.prototype.$nextTick = nextTick;

      Vue.prototype.$mounted = function (el) {
        el = document.querySelector(el);
        const vm = this;
        const options = vm.$options;
        vm.$el = el; // 获取render

        if (!options.render) {
          let template = options.template;

          if (!template && el) {
            template = el.outerHTML;
          }

          const render = compileToFunctions(template);
          options.render = render;
        }

        mountComponent(vm);
      };
    }

    function renderMixin(Vue) {
      Vue.prototype._c = function (...args) {
        return createElement(this, ...args);
      };

      Vue.prototype._v = function (text) {
        return createTextVnode(this, text);
      };

      Vue.prototype._s = function (val) {
        return val == null ? "" : typeof val === 'object' ? JSON.stringify(val) : val;
      };

      Vue.prototype._render = function () {
        let vm = this;
        let render = vm.$options.render;
        let vnode = render.call(vm);
        return vnode;
      };
    }

    function Vue(options) {
      this._init(options);
    }

    initMixin(Vue);
    lifecycleMixin(Vue);
    renderMixin(Vue);
    initGlobalAPI(Vue); // let vm1 = new Vue({

    return Vue;

})));
//# sourceMappingURL=vue.js.map
