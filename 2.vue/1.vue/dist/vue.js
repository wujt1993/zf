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

      console.log("\u8C03\u7528\u4E86\u6570\u7EC4".concat(method, "\u65B9\u6CD5"));
      return res;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      //需要对数据进行重新定义
      //当value为数组时，并不对每个元素进行defineProperty
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
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
