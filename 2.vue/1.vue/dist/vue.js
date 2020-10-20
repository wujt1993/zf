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
          attr.value = JSON.stringify(obj);
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
    console.log(code);
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
      } // console.log(`调用了数组${method}方法`);


      ob.observeArray(inserted);
      return res;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      //需要对数据进行重新定义
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

  function defineReactive(data, key, value) {
    //如果value 也是个object对象，需要递归检测
    observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return; //如果赋值为object对象,需要检测数据

        observe(newValue);
        value = newValue;
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
      vm.$options = options; //初始化状态

      initState(vm);

      if (vm.$options.el) {
        this.$mounted(vm.$options.el);
      }
    };

    Vue.prototype.$mounted = function (el) {
      el = document.querySelector(el); //1、options.render
      //2、options.template
      //3、options.el

      var vm = this;
      var options = vm.$options;

      if (!options.render) {
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML;
        }

        var render = compileToFunctions(template);
        options.render = render;
      }
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
