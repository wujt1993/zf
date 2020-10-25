(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

  function genProps(attrs) {
    var str = '';

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];

      if (attr.name == "style") {
        (function () {
          var obj = {};
          attr.value.split(';').forEach(function (item) {
            if (item) {
              var _item$split = item.split(':'),
                  _item$split2 = _slicedToArray(_item$split, 2),
                  key = _item$split2[0],
                  value = _item$split2[1];

              obj[key] = value;
            }
          });
          attr.value = obj;
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function gen(node) {
    if (node.type == 1) {
      return generate(node);
    } else {
      var text = node.text;

      if (defaultTagRE.test(text)) {
        var tokens = [];
        var match;
        var index = 0;
        var lastIndex = defaultTagRE.lastIndex = 0;

        while (match = defaultTagRE.exec(text)) {
          // aa {{ age }} haha 
          index = match.index;

          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }

          tokens.push("_s(".concat(match[1].trim(), ")"));
          lastIndex = index + match[0].length;
        }

        if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }

        return "_v(".concat(tokens.join('+'), ")");
      } else {
        return "_v(".concat(JSON.stringify(text), ")");
      }
    }
  }

  function genChildren(el) {
    var children = el.children;

    if (children) {
      return children.map(function (child) {
        return gen(child);
      }).join(',');
    }
  }

  function generate(el) {
    var children = genChildren(el);
    var code = "_c('".concat(el.tag, "',").concat(el.attrs.length != 0 ? genProps(el.attrs) : 'undefined').concat(children ? ',' + children : '', ")");
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

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // aa-aa 

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //aa:aa

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 可以匹配到标签名  [1]

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); //[0] 标签的结束名字
  //    style="xxx"   style='xxx'  style=xxx

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var startTagClose = /^\s*(\/?)>/;
  /*
  <div id="app">
      <div style="color: red">
          <span>{{ name }}</span>
      </div>
  </div>
  */

  /**
   * 生成ast树
   * {
   *      tagName: div,
   *      attrs: [{name: value, id: 'app'}],
   *      type: 1, //1：节点， 3： 文本
   *      parent: null,
   *      child: [{
   *      }]
   * 
   * }
   */

  function parseHTML(html) {
    function createASTElement(tag, attrs) {
      //生成节点
      return {
        tag: tag,
        attrs: attrs,
        type: 1,
        parent: null,
        children: []
      };
    }

    var root;
    var currentParent;
    var stack = []; //存放开始标签

    function start(tagName, attrs) {
      var node = createASTElement(tagName, attrs);

      if (root == null) {
        root = node;
      }

      currentParent = node;
      stack.push(node);
    }

    function end(tagName) {
      var node = stack.pop();
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
          text: text,
          type: 3
        });
      }
    }

    function advance(n) {
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);

        var _end, attr; //> 为标签的结束符，中间部分为标签的属性


        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5] || true
          });
          advance(attr[0].length);
        }

        if (_end) {
          advance(_end[0].length);
          return match;
        }
      }
    } //不断截取html直到html为空


    while (html) {
      var textEnd = html.indexOf("<");

      if (textEnd == 0) {
        // 当textEnd为0 的时候代表为标签开始位置
        var startTagMatch = parseStartTag(); //开始标签

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        } // ;

      }

      if (textEnd > 0) {
        // 为标签中的文本
        var text = html.substring(0, textEnd);
        advance(text.length);
        chars(text);
      }
    }

    return root;
  }

  function compileToFunctions(template) {
    var ast = parseHTML(template);
    var code = generate(ast);
    var render = "with(this){return ".concat(code, "}");
    var fn = new Function(render);
    return fn;
  } // function a(){
  //     with(this) {
  //         console.log(b)
  //     }
  // }
  // a.call({b:1}) // 1

  // 我们可以把当前的watcher 放到一个全局变量上
  var id = 0;

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = id++;
      this.subs = []; //记住watcher
    }

    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        // 让watcher 记住dep
        Dep.target.addDep(this);
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
    }, {
      key: "notify",
      value: function notify() {
        //通知所有的watcher 执行 ，更新模板
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);

    return Dep;
  }();

  Dep.target = null;
  function pushTarget(watcher) {
    Dep.target = watcher;
  }
  function popTarget(watcher) {
    Dep.target = null;
  }

  var callbacks = [];
  var waiting = false;

  function flushCallbacks() {
    for (var i = 0; i < callbacks.length; i++) {
      var callback = callbacks[i];
      callback();
    }

    waiting = false;
    callbacks = [];
  } // 批处理 第一次开定时器 ，后续只更新列表 ，之后执行清空逻辑
  // 1.第一次cb渲染watcher更新操作  （渲染watcher执行的过程肯定是同步的）
  // 2.第二次cb 用户传入的回调


  function nextTick(cb) {
    callbacks.push(cb); // 默认的cb 是渲染逻辑 用户的逻辑放到渲染逻辑之后即可

    if (!waiting) {
      waiting = true; // 1.promise先看支持不支持 
      // 2.mutationObserver
      // 3.setImmdiate
      // 4.setTimeout  Vue3 next-tick就直接用了promise

      Promise.resolve().then(flushCallbacks); // 多次调用nextTick 只会开启一个promise
    }
  }
  function isObject(item) {
    return _typeof(item) === 'object' && item !== null;
  }
  var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted'];
  var strats = {};

  function mergeHook(parentVal, childVal) {
    if (childVal) {
      if (parentVal) {
        return parentVal.concat(childVal);
      } else {
        return [childVal];
      }
    } else {
      return [parentVal];
    }
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });
  function mergeOptions(parent, child) {
    //1、自定义策略
    //2、父级元素有子元素没，则用父级元素
    //3、子元素有，则用子元素
    var options = {};

    for (var key in parent) {
      mergeFiled(key);
    }

    for (var _key in child) {
      if (!parent[_key]) mergeFiled(_key);
    }

    function mergeFiled(key) {
      if (strats[key]) {
        options[key] = mergeHook(parent[key], child[key]);
        return;
      }

      if (isObject(parent[key]) && isObject(child[key])) {
        options[key] = _objectSpread2(_objectSpread2({}, parent[key]), child[key]);
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

  var has = {};
  var queue = [];
  var pending = false;

  function flushSchedularQueue() {
    for (var i = 0, len = queue.length; i < len; i++) {
      queue[i].run();
    }

    has = {};
    queue = [];
    pending = false;
  }

  function queueWatcher(watcher) {
    var id = watcher.id;

    if (has.id == null) {
      has.id = id;
      queue.push(watcher);

      if (!pending) {
        pending = true; // setTimeout(()=>{
        //     flushSchedularQueue()
        // },0)

        nextTick(flushSchedularQueue);
      }
    }
  }

  var id$1 = 0;

  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, exprOrFn, cb, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm;
      this.cb = cb;
      this.options = options;
      this.id = id$1++;
      this.getter = exprOrFn;
      this.deps = [];
      this.depsId = new Set();
      this.get(); // 调用传入的函数， 调用了render方法， 此时会对模板中的数据进行取值
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        //每一次组件渲染都会调用此方法
        pushTarget(this);
        this.getter();
        popTarget();
      }
    }, {
      key: "addDep",
      value: function addDep(dep) {
        //当页面调用属性时，则会调用该方法，所以需要去重
        var id = dep.id;

        if (!this.depsId.has(id)) {
          // dep 是非重复的，watcher肯定也不会重
          this.depsId.add(id);
          this.deps.push(dep);
          dep.addSub(this); //dep也需要记录watcher
        }
      }
    }, {
      key: "run",
      value: function run() {
        this.getter();
      }
    }, {
      key: "update",
      value: function update() {
        // 如果多次更改 我希望合并成一次  （防抖）
        // this.get(); // 不停的重新渲染
        queueWatcher(this);
      }
    }]);

    return Watcher;
  }();

  function patch(oldVnode, vnode) {
    // oldVnode 是一个真实的元素
    var isRealElement = oldVnode.nodeType;

    if (isRealElement) {
      // 初次渲染
      var oldElm = oldVnode; // id="app"

      var parentElm = oldElm.parentNode; // body

      var el = createElm(vnode);
      parentElm.insertBefore(el, oldElm.nextSibling); // 将创建的节点查到原有的节点的下一个

      parentElm.removeChild(oldElm);
      return el; // vm.$el
    }
  }

  function createElm(vnode) {
    // 根据虚拟节点创建真实的节点
    var tag = vnode.tag,
        children = vnode.children,
        key = vnode.key,
        data = vnode.data,
        text = vnode.text,
        vm = vnode.vm;

    if (typeof tag === 'string') {
      // 可能是组件
      vnode.el = document.createElement(tag); // 用vue的指令时 可以通过vnode拿到真实dom

      updateProperties(vnode);
      children.forEach(function (child) {
        // 如果有儿子节点，就进行递归操作
        vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }

  function updateProperties(vnode) {
    var newProps = vnode.data || {}; // 属性

    var el = vnode.el; // dom元素

    for (var key in newProps) {
      if (key == 'style') {
        for (var styleName in newProps.style) {
          el.style[styleName] = newProps.style[styleName];
        }
      } else if (key === 'class') {
        el.className = newProps["class"];
      } else {
        el.setAttribute(key, newProps[key]);
      }
    }
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this; //TODO 后期修改

      vm.$el = patch(vm.$el, vnode);
    };
  }
  function callhook(vm, hook) {
    var handlers = vm.$options[hook];

    if (handlers) {
      handlers.forEach(function (hanler) {
        return hanler.call(vm);
      });
    }
  } //挂载组件

  function mountComponent(vm, el) {
    // 默认vue是通过watcher来进行渲染  = 渲染watcher （每一个组件都有一个渲染watcher）
    var updateComponent = function updateComponent() {
      var vnode = vm._render(); //生成虚拟节点


      vm._update(vnode); // 将虚拟节点转为真实节点

    };

    new Watcher(vm, updateComponent, function () {}, true); // updateComponent();
  }

  var oldArrayProtoMethods = Array.prototype;
  var arrayMethods = Object.create(Array.prototype);
  var methods = ['push', 'pop', 'unshift', 'shift', 'splice', 'reserve', 'sort'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      var _oldArrayProtoMethods;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var res = (_oldArrayProtoMethods = oldArrayProtoMethods[method]).call.apply(_oldArrayProtoMethods, [this].concat(args));

      var ob = this.__ob__;
      var inserted;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          inserted = args.slice(2);
      }

      ob.dep.notify(); // console.log(`调用了数组${method}方法`);

      ob.observeArray(inserted);
      return res;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      //给元素本身也加一个dep，主要用于数组
      this.dep = new Dep(); //需要对数据进行重新定义
      //将this 值挂载到this.__ob__ 以便外部使用，防止属性被遍历引起是死循环

      Object.defineProperty(value, "__ob__", {
        configurable: false,
        enumerable: false,
        value: this
      }); //当value为数组时，并不对每个元素进行defineProperty
      //当数组长度发生变化时，监听数组数据：push、pop、unshift、shift、splice、reserve、 sort

      if (Array.isArray(value)) {
        Object.setPrototypeOf(value, arrayMethods);
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(value) {
        for (var i = 0, length = value.length; i < length; i++) {
          observe(value[i]);
        }
      }
    }, {
      key: "walk",
      value: function walk(data) {
        Object.keys(data).forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();

  function dependArray(value) {
    for (var i = 0; i < value.length; i++) {
      var current = value[i];
      current.__ob__ && current.__ob__.dep.depend();

      if (Array.isArray(current)) {
        dependArray(current);
      }
    }
  }

  function defineReactive(data, key, value) {
    //如果value 也是个object对象，需要递归检测
    var childOb = observe(value); //每个属性都有一个dep

    var dep = new Dep();
    Object.defineProperty(data, key, {
      get: function get() {
        if (Dep.target) {
          //模板取值的时候才会进行依赖搜集
          // 让这个属性自己的dep记住这个watcher，也要让watcher记住这个dep
          dep.depend();

          if (childOb) {
            childOb.dep.depend();

            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }

        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return; //如果赋值为object对象,需要检测数据

        observe(newValue);
        value = newValue;
        dep.notify(); //通知dep执行watcher更新模板
      }
    });
  } //检测数据

  function observe(data) {
    //只能对对象类型进行观测
    if (_typeof(data) !== 'object' || data === null) {
      return;
    } //通过类对数据进行观测


    return new Observer(data);
  }

  function initState(vm) {
    //将所有配置信息挂载在vm上，以便后续数据视图更新
    var opts = vm.$options;

    if (opts.data) {
      //初始化数据
      initData(vm);
    }
  }

  function proxy(target, source, key) {
    Object.defineProperty(target, key, {
      get: function get() {
        return target[source][key];
      },
      set: function set(newValue) {
        target[source][key] = newValue;
      }
    });
  }

  function initData(vm) {
    // 获取 用户数据
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data; // 数据劫持，将_data 属性上的所有值初始化到vm上

    for (var key in data) {
      proxy(vm, '_data', key);
    } //检测数据


    observe(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      // vue 可以通过$options 获取配置信息
      var vm = this;
      vm.$options = mergeOptions(vm.constructor.options, options);
      console.log(vm.$options); //初始化状态

      callhook(vm, 'beforeCreate');
      initState(vm);
      callhook(vm, 'created');

      if (vm.$options.el) {
        this.$mounted(vm.$options.el);
      }
    };

    Vue.prototype.$nextTick = nextTick;

    Vue.prototype.$mounted = function (el) {
      el = document.querySelector(el); //1、options.render
      //2、options.template
      //3、options.el

      var vm = this;
      var options = vm.$options;
      vm.$el = el;

      if (!options.render) {
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML;
        }

        var render = compileToFunctions(template);
        options.render = render;
      } //挂载组件


      mountComponent(vm);
    };
  }

  //创建虚拟节点
  function createElement(vm, tag) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    return vnode(vm, tag, data, data.key, children, undefined);
  }
  function createTextVnode(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
  }

  function vnode(vm, tag, data, key, children, text) {
    return {
      vm: vm,
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._c = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return createElement.apply(void 0, [this].concat(args));
    };

    Vue.prototype._v = function (text) {
      return createTextVnode(this, text);
    };

    Vue.prototype._s = function (val) {
      return val == null ? "" : _typeof(val) === 'object' ? JSON.stringify(val) : val;
    };

    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      var vnode = render.call(vm);
      return vnode;
    };
  }

  function initGlobalAPI(Vue) {
    Vue.options = {};

    Vue.mixin = function (mixin) {
      this.options = mergeOptions(this.options, mixin);
      return this;
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);
  lifecycleMixin(Vue); //将虚拟节点转换为真实节点

  renderMixin(Vue); //创建虚拟节点

  initGlobalAPI(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
