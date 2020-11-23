(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
    var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
    var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 标签开头的正则 捕获的内容是标签名

    var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配标签结尾的 </div>

    var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

    var startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >

    function start(tagName, attrs) {
      console.log('start:', tagName, attrs);
    }

    function chars(text) {
      console.log('chars:', text);
    }

    function end(tagName) {
      console.log('end:', tagName);
    }

    function parseHTML(html) {
      while (html) {
        var textEnd = html.indexOf("<");

        if (textEnd == 0) {
          var startTagMatch = parseStartTag(); // 获取开始标签的标签名及属性

          if (startTagMatch) {
            start(startTagMatch.tagName, startTagMatch.attrs);
            continue;
          }

          var endTagMatch = html.match(endTag);

          if (endTagMatch) {
            end(endTagMatch[1]);
            advance(endTagMatch[0].length);
            continue;
          }
        }

        if (textEnd > 0) {
          var text = html.substring(0, textEnd);
          advance(text.length);
          chars(text); // 3解析文本
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
          advance(start[0].length); //// 将标签删除

          var _end, attr; // 标签结束符 、 属性


          while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            match.attrs.push({
              name: attr[1],
              value: attr[3] || attr[4] || attr[5]
            });
            advance(attr[0].length);
          }

          if (_end) {
            // 去掉开始标签的 >
            advance(_end[0].length);
            return match;
          }
        }
      }
    }

    function compilerToFunctions(template) {
      //解析html树：将HTML -> ast 语法树
      var root = parseHTML(template);
    }

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

    function isObject(data) {
      return _typeof(data) === 'object' && data !== null;
    }
    function proxy(vm, source, key) {
      Object.defineProperty(vm, key, {
        get: function get() {
          return data[source][key];
        },
        set: function set(newValue) {
          data[source][key] = newValue;
        }
      });
    }

    var oldArrayMethods = Array.prototype;
    var arrayMethods = Object.create(oldArrayMethods);
    var methods = ['push', 'pop', 'unshift', 'shift', 'splice', 'sort', 'reserve'];
    methods.forEach(function (method) {
      arrayMethods[method] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var result = oldArrayMethods[method].apply(this, args);
        var ob = this.__ob__;
        var inserted;

        switch (method) {
          case "push":
          case "unshift":
            inserted = args;
            break;

          case 'splice':
            inserted = args.slice(2);
            break;
        }

        if (inserted) ob.observeArray(inserted);
        return result;
      };
    });

    var Observer = /*#__PURE__*/function () {
      function Observer(value) {
        _classCallCheck(this, Observer);

        //添加__ob__属性，用于对象挂载本身，且不能被枚举遍历
        Object.defineProperty(value, '__ob__', {
          enumerable: false,
          configurable: false,
          value: this
        });

        if (Array.isArray(value)) {
          value.__proto__ = arrayMethods; //对改变数组长度及改变数组排序的方法进行劫持

          this.observeArray(value); //对每个元素进行数据劫持
        } else {
          this.walk(value); //对象 
        }
      }

      _createClass(Observer, [{
        key: "observeArray",
        value: function observeArray(data) {
          data.forEach(function (item) {
            observe(item);
          });
        }
      }, {
        key: "walk",
        value: function walk(data) {
          var keys = Object.keys(data);
          keys.forEach(function (key) {
            defineReactive(data, key, data[key]);
          });
        }
      }]);

      return Observer;
    }();

    function defineReactive(data, key, value) {
      observe(value);
      Object.defineProperty(data, key, {
        get: function get() {
          return value;
        },
        set: function set(newValue) {
          observe(newValue);
          value = newValue;
        }
      });
    }

    function observe(data) {
      if (!isObject(data)) return;
      new Observer(data);
    }

    function initState(vm) {
      // vue的数据来源 属性 方法 数据 计算属性 watch
      var opts = vm.$options;

      if (opts.props) ;

      if (opts.methods) ;

      if (opts.data) {
        initData(vm);
      }

      if (opts.computed) ;

      if (opts.watch) ;
    }

    function initData(vm) {
      var data = vm.$options.data;
      data = vm._data = typeof data === 'function' ? data() : data; //将_data上的数据代理给vm，以便用户使用

      for (var key in data) {
        proxy(vm, '_data', key);
      } //数据响应式处理(Object.definePrototype)


      observe(data);
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        var vm = this;
        vm.$options = options; //将配置信息挂载子Vue实例的$options 上
        //初始化状态

        initState(vm); //页面挂载

        if (vm.$options.el) {
          vm.$mount(vm.$options.el);
        }
      };

      Vue.prototype.$mount = function (el) {
        var vm = this;
        var options = vm.$options;
        el = document.querySelector(el);

        if (!options.render) {
          var template = options.template;

          if (!template && el) {
            template = el.outerHTML;
          } //将template 转成render


          var render = compilerToFunctions(template);
        }
      };
    }

    function Vue(options) {
      //初始化vue
      this._init(options);
    }

    initMixin(Vue); //给原型上添加_init方法，初始化vue

    return Vue;

})));
//# sourceMappingURL=vue.js.map
