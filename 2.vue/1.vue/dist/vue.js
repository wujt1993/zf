(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

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

    function parseHTML(html) {
      function advance(n) {
        html = html.substring(n);
      } //获取开始标签


      function parseStartTag() {
        var start = html.match(startTagOpen);

        if (start) {
          var match = {
            tagName: start[1],
            attrs: []
          }; // 截掉已匹配的部分

          advance(start[0].length); //获取该标签的属性, 当碰到 > 则为该标签结束位置

          var end, attr;

          while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            advance(attr[0].length);
            match.attrs.push({
              name: attr[1],
              value: attr[3] || attr[4] || attr[5] || true
            });
          }

          if (end) {
            advance(end[0].length);
            return match;
          }
        }
      } //不断截取html直到html为空


      while (html) {
        //获取标签开头 <
        var textEnd = html.indexOf('<');

        if (textEnd == 0) {
          //当 < 的位置为 0时，代表为标签
          //如果是开始标签
          var startTagMatch = parseStartTag();

          if (startTagMatch) {
            console.log('开始...', startTagMatch.tagName);
            continue;
          }

          var endTagMatch = html.match(endTag);

          if (endTagMatch) {
            console.log('结束...', endTagMatch[1]);
            advance(endTagMatch[0].length);
            continue;
          }
        }

        var text = void 0;

        if (textEnd > 0) {
          text = html.substring(0, textEnd);
          advance(text.length);
          console.log("text...", text);
        }
      }
    }

    function compileToFunctions(template) {
      parseHTML(template);
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
