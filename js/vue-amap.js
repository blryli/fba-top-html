(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define("VueAMap", ["vue"], factory);
	else if(typeof exports === 'object')
		exports["VueAMap"] = factory(require("vue"));
	else
		root["VueAMap"] = factory(root["Vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_49__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 115);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(42)('wks');
var uid = __webpack_require__(17);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uppercamelcase = __webpack_require__(47);

var _uppercamelcase2 = _interopRequireDefault(_uppercamelcase);

var _constant = __webpack_require__(27);

var _constant2 = _interopRequireDefault(_constant);

var _convertHelper = __webpack_require__(5);

var _eventHelper = __webpack_require__(28);

var _eventHelper2 = _interopRequireDefault(_eventHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = {
  data: function data() {
    return {
      unwatchFns: []
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$amap = this.$amap || this.$parent.$amap;
    if (this.$amap) {
      this.register();
    } else {
      this.$on(_constant2.default.AMAP_READY_EVENT, function (map) {
        _this.$amap = map;
        _this.register();
      });
    }
  },
  destroyed: function destroyed() {
    this.unregisterEvents();
    if (!this.$amapComponent) return;
    this.$amapComponent.setMap && this.$amapComponent.setMap(null);
    this.$amapComponent.close && this.$amapComponent.close();
    this.$amapComponent.editor && this.$amapComponent.editor.close();
    this.unwatchFns.forEach(function (item) {
      return item();
    });
    this.unwatchFns = [];
  },


  methods: {
    getHandlerFun: function getHandlerFun(prop) {
      if (this.handlers && this.handlers[prop]) {
        return this.handlers[prop];
      }
      return this.$amapComponent['set' + (0, _uppercamelcase2.default)(prop)] || this.$amapComponent.setOptions;
    },
    convertProps: function convertProps() {
      var _this2 = this;

      var props = {};
      if (this.$amap) props.map = this.$amap;
      var propsData = this.$options.propsData,
          propsRedirect = this.propsRedirect;

      return Object.keys(propsData).reduce(function (res, _key) {
        var key = _key;
        var propsValue = _this2.convertSignalProp(key, propsData[key]);
        if (propsValue === undefined) return res;
        if (propsRedirect && propsRedirect[_key]) key = propsRedirect[key];
        props[key] = propsValue;
        return res;
      }, props);
    },
    convertSignalProp: function convertSignalProp(key, sourceDate) {
      if (this.converters && this.converters[key]) {
        return this.converters[key](sourceDate);
      } else {
        var convertFn = {
          position: _convertHelper.toLngLat,
          offset: _convertHelper.toPixel,
          bounds: _convertHelper.toBounds
        }[key];
        if (convertFn) return convertFn(sourceDate);
        return sourceDate;
      }
    },
    registerEvents: function registerEvents() {
      this.setEditorEvents && this.setEditorEvents();
      if (this.$options.propsData.events) {
        for (var eventName in this.events) {
          _eventHelper2.default.addListener(this.$amapComponent, eventName, this.events[eventName]);
        }
      }
      if (this.$options.propsData.onceEvents) {
        for (var _eventName in this.onceEvents) {
          _eventHelper2.default.addListenerOnce(this.$amapComponent, _eventName, this.onceEvents[_eventName]);
        }
      }
    },
    unregisterEvents: function unregisterEvents() {
      _eventHelper2.default.clearListeners(this.$amapComponent);
    },
    setPropWatchers: function setPropWatchers() {
      var _this3 = this;

      var propsRedirect = this.propsRedirect,
          propsData = this.$options.propsData;

      Object.keys(propsData).forEach(function (prop) {
        var handleProp = prop;
        if (propsRedirect && propsRedirect[prop]) handleProp = propsRedirect[prop];
        var handleFun = _this3.getHandlerFun(handleProp);
        if (!handleFun && prop !== 'events') return;

        var unwatch = _this3.$watch(prop, function (nv) {
          if (prop === 'events') {
            _this3.unregisterEvents();
            _this3.registerEvents();
            return;
          }
          if (handleFun === _this3.$amapComponent.setOptions) {
            return handleFun.call(_this3.$amapComponent, _defineProperty({}, handleProp, _this3.convertSignalProp(prop, nv)));
          }
          handleFun.call(_this3.$amapComponent, _this3.convertSignalProp(prop, nv));
        });
        _this3.unwatchFns.push(unwatch);
      });
    },
    registerToManager: function registerToManager() {
      var manager = this.amapManager || this.$parent.amapManager;
      if (manager && this.vid !== undefined) {
        manager.setComponent(this.vid, this.$amapComponent);
      }
    },
    initProps: function initProps() {
      var _this4 = this;

      var props = ['editable', 'visible'];
      props.forEach(function (propStr) {
        if (_this4[propStr] !== undefined) {
          var handleFun = _this4.getHandlerFun(propStr);
          handleFun.call(_this4.$amapComponent, _this4.convertSignalProp(propStr, _this4[propStr]));
        }
      });
    },
    register: function register() {
      this.initComponent && this.initComponent(this.convertProps());
      this.registerEvents();
      this.initProps();
      this.setPropWatchers();
      this.registerToManager();
      if (this.events && this.events.init) this.events.init(this.$amapComponent, this.$amap, this.amapManager || this.$parent.amapManager);
    },
    $$getInstance: function $$getInstance() {
      return this.$amapComponent;
    }
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toPixel = toPixel;
exports.pixelTo = pixelTo;
exports.toLngLat = toLngLat;
exports.lngLatTo = lngLatTo;
exports.toBounds = toBounds;
function toPixel(arr) {
  return new AMap.Pixel(arr[0], arr[1]);
}

function pixelTo(pixel) {
  if (Array.isArray(pixel)) return pixel;
  return [pixel.getX(), pixel.getY()];
}

function toLngLat(arr) {
  return new AMap.LngLat(arr[0], arr[1]);
}

function lngLatTo(lngLat) {
  if (!lngLat) return;
  if (Array.isArray(lngLat)) return lngLat.slice();
  return [lngLat.getLng(), lngLat.getLat()];
}

function toBounds(arrs) {
  return new AMap.Bounds(toLngLat(arrs[0]), toLngLat(arrs[1]));
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(15)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var createDesc = __webpack_require__(22);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(36);
var toPrimitive = __webpack_require__(44);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var hide = __webpack_require__(9);
var has = __webpack_require__(7);
var SRC = __webpack_require__(17)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(13).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(67);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(74);
var defined = __webpack_require__(20);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventHelper = __webpack_require__(28);

var _eventHelper2 = _interopRequireDefault(_eventHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    setEditorEvents: function setEditorEvents() {
      var _this = this;

      if (!this.$amapComponent.editor || !this.events) return;
      var filters = ['addnode', 'adjust', 'removenode', 'end', 'move'];
      var filterSet = {};
      Object.keys(this.events).forEach(function (key) {
        if (filters.indexOf(key) !== -1) filterSet[key] = _this.events[key];
      });
      Object.keys(filterSet).forEach(function (key) {
        _eventHelper2.default.addListener(_this.$amapComponent.editor, key, filterSet[key]);
      });
    }
  }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lazyAMapApiLoaderInstance = exports.initAMapApiLoader = undefined;

var _lazyAmapApiLoader = __webpack_require__(54);

var _lazyAmapApiLoader2 = _interopRequireDefault(_lazyAmapApiLoader);

var _vue = __webpack_require__(49);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lazyAMapApiLoaderInstance = null;
var initAMapApiLoader = exports.initAMapApiLoader = function initAMapApiLoader(config) {
  if (_vue2.default.prototype.$isServer) return;

  if (lazyAMapApiLoaderInstance) return;
  if (!lazyAMapApiLoaderInstance) exports.lazyAMapApiLoaderInstance = lazyAMapApiLoaderInstance = new _lazyAmapApiLoader2.default(config);
  lazyAMapApiLoaderInstance.load();
};
exports.lazyAMapApiLoaderInstance = lazyAMapApiLoaderInstance;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(79);
var $export = __webpack_require__(34);
var redefine = __webpack_require__(11);
var hide = __webpack_require__(9);
var has = __webpack_require__(7);
var Iterators = __webpack_require__(12);
var $iterCreate = __webpack_require__(77);
var setToStringTag = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(82);
var ITERATOR = __webpack_require__(0)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(10).f;
var has = __webpack_require__(7);
var TAG = __webpack_require__(0)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(42)('keys');
var uid = __webpack_require__(17);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountedRenderFn = exports.mountedVNode = exports.compile = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _vue = __webpack_require__(49);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compile = exports.compile = function compile(tpl, vm) {
  var keys = ['methods', 'computed', 'data', 'filters'];
  var props = {};

  var node = _vue2.default.compile(tpl);
  keys.forEach(function (key) {
    props[key] = vm.$parent.$parent.$options[key];

    if (key === 'data' && typeof props[key] === 'function') {
      props[key] = props[key]();
    }
  });

  var vNode = new _vue2.default(_extends({}, props, node));

  return vNode.$mount().$el;
};

var mountedVNode = exports.mountedVNode = function mountedVNode(vn) {
  var instance = new _vue2.default({ render: function render(h) {
      return h(
        'div',
        null,
        [vn]
      );
    } });
  return instance.$mount().$el;
};

var mountedRenderFn = exports.mountedRenderFn = function mountedRenderFn(renderFn, vueInstance) {
  var instance = new _vue2.default({ render: function render(h) {
      return renderFn(h, vueInstance);
    } });
  return instance.$mount().$el;
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  AMAP_READY_EVENT: 'AMAP_READY_EVENT'
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eventHelper = void 0;

var EventHelper = function () {
  function EventHelper() {
    _classCallCheck(this, EventHelper);

    this._listener = new Map();
  }

  _createClass(EventHelper, [{
    key: 'addListener',
    value: function addListener(instance, eventName, handler, context) {
      if (!AMap.event) throw new Error('please wait for Map API load');
      var listener = AMap.event.addListener(instance, eventName, handler, context);
      if (!this._listener.get(instance)) this._listener.set(instance, {});
      var listenerMap = this._listener.get(instance);
      if (!listenerMap[eventName]) listenerMap[eventName] = [];
      listenerMap[eventName].push(listener);
    }
  }, {
    key: 'removeListener',
    value: function removeListener(instance, eventName, handler) {
      if (!AMap.event) throw new Error('please wait for Map API load');
      if (!this._listener.get(instance) || !this._listener.get(instance)[eventName]) return;
      var listenerArr = this._listener.get(instance)[eventName];
      if (handler) {
        var l_index = listenerArr.indexOf(handler);
        AMap.event.removeListener(listenerArr[l_index]);
        listenerArr.splice(l_index, 1);
      } else {
        listenerArr.forEach(function (listener) {
          AMap.event.removeListener(listener);
        });
        this._listener.get(instance)[eventName] = [];
      }
    }
  }, {
    key: 'addListenerOnce',
    value: function addListenerOnce(instance, eventName, handler, context) {
      return AMap.event.addListenerOnce(instance, eventName, handler, context);
    }
  }, {
    key: 'trigger',
    value: function trigger(instance, eventName, args) {
      return AMap.event.trigger(instance, eventName, args);
    }
  }, {
    key: 'clearListeners',
    value: function clearListeners(instance) {
      var _this = this;

      var listeners = this._listener.get(instance);
      if (!listeners) return;
      Object.keys(listeners).map(function (eventName) {
        _this.removeListener(instance, eventName);
      });
    }
  }]);

  return EventHelper;
}();

;

eventHelper = eventHelper || new EventHelper();

exports.default = eventHelper;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(31);
var TAG = __webpack_require__(0)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(13);
var hide = __webpack_require__(9);
var redefine = __webpack_require__(11);
var ctx = __webpack_require__(14);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(14);
var call = __webpack_require__(76);
var isArrayIter = __webpack_require__(75);
var anObject = __webpack_require__(8);
var toLength = __webpack_require__(43);
var getIterFn = __webpack_require__(90);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(15)(function () {
  return Object.defineProperty(__webpack_require__(32)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(17)('meta');
var isObject = __webpack_require__(3);
var has = __webpack_require__(7);
var setDesc = __webpack_require__(10).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(15)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(8);
var dPs = __webpack_require__(80);
var enumBugKeys = __webpack_require__(33);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(32)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(72).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(83);
var enumBugKeys = __webpack_require__(33);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(11);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(25);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(3);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var camelCase = __webpack_require__(65);

module.exports = function () {
	var cased = camelCase.apply(camelCase, arguments);
	return cased.charAt(0).toUpperCase() + cased.slice(1);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(114)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_49__;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lazyAMapApiLoaderInstance = exports.initAMapApiLoader = exports.AMapManager = undefined;

var _injectedAmapApiInstance = __webpack_require__(19);

Object.defineProperty(exports, 'lazyAMapApiLoaderInstance', {
  enumerable: true,
  get: function get() {
    return _injectedAmapApiInstance.lazyAMapApiLoaderInstance;
  }
});

__webpack_require__(53);

var _uppercamelcase = __webpack_require__(47);

var _uppercamelcase2 = _interopRequireDefault(_uppercamelcase);

var _amap = __webpack_require__(105);

var _amap2 = _interopRequireDefault(_amap);

var _amapMarker = __webpack_require__(101);

var _amapMarker2 = _interopRequireDefault(_amapMarker);

var _amapSearchBox = __webpack_require__(104);

var _amapSearchBox2 = _interopRequireDefault(_amapSearchBox);

var _amapCircle = __webpack_require__(98);

var _amapCircle2 = _interopRequireDefault(_amapCircle);

var _amapGroundImage = __webpack_require__(99);

var _amapGroundImage2 = _interopRequireDefault(_amapGroundImage);

var _amapInfoWindow = __webpack_require__(100);

var _amapInfoWindow2 = _interopRequireDefault(_amapInfoWindow);

var _amapPolyline = __webpack_require__(103);

var _amapPolyline2 = _interopRequireDefault(_amapPolyline);

var _amapPolygon = __webpack_require__(102);

var _amapPolygon2 = _interopRequireDefault(_amapPolygon);

var _amapManager = __webpack_require__(51);

var _amapManager2 = _interopRequireDefault(_amapManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = [_amap2.default, _amapMarker2.default, _amapSearchBox2.default, _amapCircle2.default, _amapGroundImage2.default, _amapInfoWindow2.default, _amapPolygon2.default, _amapPolyline2.default];

var VueAMap = {
  initAMapApiLoader: _injectedAmapApiInstance.initAMapApiLoader,
  AMapManager: _amapManager2.default
};

VueAMap.install = function (Vue) {
  if (VueAMap.installed) return;
  Vue.config.optionMergeStrategies.deferredReady = Vue.config.optionMergeStrategies.created;
  components.map(function (_component) {
    Vue.component(_component.name, _component);
    VueAMap[(0, _uppercamelcase2.default)(_component.name).replace(/^El/, '')] = _component;
  });
};

var install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (install.installed) return;
  VueAMap.install(Vue);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

exports.default = VueAMap;
exports.AMapManager = _amapManager2.default;
exports.initAMapApiLoader = _injectedAmapApiInstance.initAMapApiLoader;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AMapManager = function () {
  function AMapManager() {
    _classCallCheck(this, AMapManager);

    this._componentMap = new Map();
    this._map = null;
  }

  _createClass(AMapManager, [{
    key: "setMap",
    value: function setMap(map) {
      this._map = map;
    }
  }, {
    key: "getMap",
    value: function getMap() {
      return this._map;
    }
  }, {
    key: "setComponent",
    value: function setComponent(id, component) {
      this._componentMap.set(id, component);
    }
  }, {
    key: "getComponent",
    value: function getComponent(id) {
      return this._componentMap.get(id);
    }
  }, {
    key: "getChildInstance",
    value: function getChildInstance(id) {
      return this.getComponent(id);
    }
  }, {
    key: "removeComponent",
    value: function removeComponent(id) {
      this._componentMap.delete(id);
    }
  }]);

  return AMapManager;
}();

exports.default = AMapManager;
;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


function RemoGeoLocation() {
  this._remoteSvrUrl = 'https://webapi.amap.com/html/geolocate.html';
  this._callbackList = [];
  this._seqBase = 1;
  this._frameReady = 0;
  this._watchIdMap = {};
}

RemoGeoLocation.prototype = {
  _getSeq: function _getSeq() {
    return this._seqBase++;
  },
  _onRrameReady: function _onRrameReady(callback) {
    if (this._frameReady === 0) {
      if (!this._frameReadyList) {
        this._frameReadyList = [];
      }
      this._frameReadyList.push(callback);
      this._prepareIframe();
      return;
    }

    callback.call(this);
  },
  _prepareIframe: function _prepareIframe() {

    if (this._iframeWin) {
      return;
    }

    var ifrm = document.createElement('iframe');

    ifrm.src = this._remoteSvrUrl + (this._remoteSvrUrl.indexOf('?') > 0 ? '&' : '?');

    ifrm.width = '0px';
    ifrm.height = '0px';
    ifrm.style.position = 'absolute';
    ifrm.style.display = 'none';

    var self = this;

    var timeoutId = setTimeout(function () {

      self._frameReady = false;

      self._callbackFrameReadyList();
    }, 5000);

    ifrm.onload = function () {

      clearTimeout(timeoutId);

      self._frameReady = true;

      self._callbackFrameReadyList();

      ifrm.onload = null;
    };

    document.body.appendChild(ifrm);

    this._iframeWin = ifrm.contentWindow;

    window.addEventListener('message', function (e) {

      if (self._remoteSvrUrl.indexOf(e['origin']) !== 0) {
        return;
      }

      self._handleRemoteMsg(e['data']);
    }, false);
  },
  _callbackFrameReadyList: function _callbackFrameReadyList() {

    if (this._frameReadyList) {

      var list = this._frameReadyList;
      this._frameReadyList = null;

      for (var i = 0, len = list.length; i < len; i++) {
        list[i].call(this, this._frameReady);
      }
    }
  },
  _pickCallback: function _pickCallback(seqNum, keepInList) {

    var callbackList = this._callbackList;

    for (var i = 0, len = callbackList.length; i < len; i++) {

      var cbkInfo = callbackList[i];

      if (seqNum === cbkInfo.seq) {

        if (!keepInList) {
          callbackList.splice(i, 1);
        }

        return cbkInfo;
      }
    }
  },
  _handleRemoteMsg: function _handleRemoteMsg(msg) {

    var seqNum = msg['seq'];

    var cbkInfo = this._pickCallback(seqNum, !!msg['notify']);

    if (cbkInfo) {

      cbkInfo.cbk.call(null, msg['error'], msg['result']);
    } else {

      console.warn('Receive remote msg: ', msg);
    }
  },
  _postMessage: function _postMessage(cmd, args, callback, seq) {

    this._prepareIframe();

    var msg = {
      'cmd': cmd,
      'args': args,
      'seq': seq || this._getSeq()
    };

    this._callbackList.push({
      cbk: callback,
      seq: msg['seq']
    });

    this._onRrameReady(function () {

      if (this._frameReady === true) {

        try {

          this._iframeWin.postMessage(msg, '*');
        } catch (e) {

          this._pickCallback(msg['seq']);

          callback(e);
        }
      } else {

        this._pickCallback(msg['seq']);

        callback({
          'message': 'iFrame load failed!'
        });
      }
    });
  },
  'getCurrentPosition': function getCurrentPosition(succHandler, errHandler, options) {

    this._postMessage('getCurrentPosition', [options], function (err, result) {

      if (err) {
        if (errHandler) {
          errHandler(err);
        }
        return;
      }
      if (succHandler) {
        succHandler(result);
      }
    });
  },
  'watchPosition': function watchPosition(succHandler, errHandler, options) {

    var watchKey = 'wk' + this._getSeq();
    var cmdSeq = this._getSeq();

    this._watchIdMap[watchKey] = {
      stat: 0,
      seq: cmdSeq
    };

    var self = this;

    this._postMessage('watchPosition', [options], function (err, result) {

      var id = null;

      if (result) {
        id = result['id'];
      }

      var watchInfo = self._watchIdMap[watchKey];

      watchInfo.id = id;
      watchInfo.stat = 1;

      if (watchInfo.callbackList) {

        var list = watchInfo.callbackList;
        watchInfo.callbackList = null;

        for (var i = 0, len = list.length; i < len; i++) {
          list[i].call(self, id);
        }
      }

      if (err) {
        if (errHandler) {
          errHandler(err);
        }
        return;
      }

      if (succHandler) {
        succHandler(result['pos']);
      }
    }, cmdSeq);

    return watchKey;
  },
  'clearWatch': function clearWatch(watchKey, callback) {

    if (!this._watchIdMap[watchKey]) {
      callback('Id not exists: ' + watchKey);
      return;
    }

    var watchInfo = this._watchIdMap[watchKey];

    var self = this;

    function clearId(id) {

      self._postMessage('clearWatch', [id], function (err, result) {

        if (!err) {

          self._pickCallback(watchInfo.seq);

          delete self._watchIdMap[watchKey];
        }

        if (callback) {
          callback(err, result);
        }
      });
    }

    if (watchInfo.stat < 1) {

      if (!watchInfo.callbackList) {
        watchInfo.callbackList = [];
      }

      watchInfo.callbackList.push(function (id) {
        clearId(id);
      });
    } else {
      clearId(watchInfo.id);
    }
  }
};

exports.default = RemoGeoLocation;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(66);

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _polyfill = __webpack_require__(56);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;
var DEFAULT_AMP_CONFIG = {
  key: null,
  v: '1.3',
  protocol: 'https',
  hostAndPath: 'webapi.amap.com/maps',
  plugin: [],
  callback: 'amapInitComponent'
};

var AMapAPILoader = function () {
  function AMapAPILoader(config) {
    _classCallCheck(this, AMapAPILoader);

    this._config = _extends({}, DEFAULT_AMP_CONFIG, config);
    this._document = document;
    this._window = window;
    this._scriptLoaded = false;
    this._queueEvents = [_polyfill.patchIOS11Geo];
  }

  _createClass(AMapAPILoader, [{
    key: 'load',
    value: function load() {
      var _this = this;

      if (this._window.AMap && this._window.AMap.Map) {
        return this.loadUIAMap();
      }

      if (this._scriptLoadingPromise) return this._scriptLoadingPromise;
      var script = this._document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = this._getScriptSrc();

      var UIPromise = this._config.uiVersion ? this.loadUIAMap() : null;

      this._scriptLoadingPromise = new Promise(function (resolve, reject) {
        _this._window['amapInitComponent'] = function () {
          while (_this._queueEvents.length) {
            _this._queueEvents.pop().apply();
          }
          if (UIPromise) {
            UIPromise.then(function () {
              window.initAMapUI();
              setTimeout(resolve);
            });
          } else {
            return resolve();
          }
        };
        script.onerror = function (error) {
          return reject(error);
        };
      });
      this._document.head.appendChild(script);
      return this._scriptLoadingPromise;
    }
  }, {
    key: 'loadUIAMap',
    value: function loadUIAMap() {
      var _this2 = this;

      if (!this._config.uiVersion || window.AMapUI) return Promise.resolve();
      return new Promise(function (resolve, reject) {
        var UIScript = document.createElement('script');
        UIScript.src = _this2._config.protocol + '://webapi.amap.com/ui/' + _this2._config.uiVersion + '/main-async.js';
        UIScript.type = 'text/javascript';
        UIScript.async = true;
        UIScript.defer = true;
        _this2._document.head.appendChild(UIScript);
        UIScript.onload = function () {
          setTimeout(resolve);
        };
        UIScript.onerror = function () {
          return reject();
        };
      });
    }
  }, {
    key: '_getScriptSrc',
    value: function _getScriptSrc() {
      var amap_prefix_reg = /^AMap./;

      var config = this._config;
      var paramKeys = ['v', 'key', 'plugin', 'callback'];

      if (config.plugin && config.plugin.length > 0) {
        config.plugin.push('Autocomplete', 'PlaceSearch', 'PolyEditor', 'CircleEditor');

        config.plugin = config.plugin.map(function (item) {
          return amap_prefix_reg.test(item) ? item : 'AMap.' + item;
        });
      }

      var params = Object.keys(config).filter(function (k) {
        return ~paramKeys.indexOf(k);
      }).filter(function (k) {
        return config[k] != null;
      }).filter(function (k) {
        return !Array.isArray(config[k]) || Array.isArray(config[k]) && config[k].length > 0;
      }).map(function (k) {
        var v = config[k];
        if (Array.isArray(v)) return { key: k, value: v.join(',') };
        return { key: k, value: v };
      }).map(function (entry) {
        return entry.key + '=' + entry.value;
      }).join('&');
      return this._config.protocol + '://' + this._config.hostAndPath + '?' + params;
    }
  }]);

  return AMapAPILoader;
}();

exports.default = AMapAPILoader;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = guid;
function guid() {
  var s = [];
  var hexDigits = '0123456789abcdef';
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';

  var uuid = s.join('');
  return uuid;
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assign = assign;
exports.patchIOS11Geo = patchIOS11Geo;

var _remote = __webpack_require__(52);

var _remote2 = _interopRequireDefault(_remote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assign(target, varArgs) {
  if (typeof Object.assign !== 'function') {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) {
        for (var nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  } else {
    return Object.assign.apply(Object, arguments);
  }
};

function patchIOS11Geo() {
  if (AMap.UA.ios && document.location.protocol !== 'https:') {
    var remoGeo = new _remote2.default();

    navigator.geolocation.getCurrentPosition = function () {
      return remoGeo.getCurrentPosition.apply(remoGeo, arguments);
    };

    navigator.geolocation.watchPosition = function () {
      return remoGeo.watchPosition.apply(remoGeo, arguments);
    };
  }
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _registerComponent = __webpack_require__(2);

var _registerComponent2 = _interopRequireDefault(_registerComponent);

var _convertHelper = __webpack_require__(5);

var _editorComponent = __webpack_require__(18);

var _editorComponent2 = _interopRequireDefault(_editorComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'el-amap-circle',
  mixins: [_registerComponent2.default, _editorComponent2.default],
  props: ['vid', 'zIndex', 'center', 'bubble', 'radius', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'editable', 'fillColor', 'fillOpacity', 'strokeStyle', 'extData', 'strokeDasharray', 'events', 'visible', 'extData', 'onceEvents'],
  data: function data() {
    return {
      converters: {
        center: function center(arr) {
          return (0, _convertHelper.toLngLat)(arr);
        }
      },
      handlers: {
        zIndex: function zIndex(index) {
          this.setzIndex(index);
        },
        visible: function visible(flag) {
          flag === false ? this.hide() : this.show();
        },
        editable: function editable(flag) {
          flag === true ? this.editor.open() : this.editor.close();
        }
      }
    };
  },

  methods: {
    initComponent: function initComponent(options) {
      this.$amapComponent = new AMap.Circle(options);
      this.$amapComponent.editor = new AMap.CircleEditor(this.$amap, this.$amapComponent);
    },
    $$getCenter: function $$getCenter() {
      return (0, _convertHelper.lngLatTo)(this.$amapComponent.getCenter());
    }
  }
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _registerComponent = __webpack_require__(2);

var _registerComponent2 = _interopRequireDefault(_registerComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'el-amap-ground-image',
  mixins: [_registerComponent2.default],
  props: ['vid', 'clickable', 'opacity', 'url', 'bounds', 'visible', 'events', 'onceEvents'],
  destroyed: function destroyed() {
    this.$amapComponent.setMap(null);
  },
  data: function data() {
    return {
      converters: {},
      handlers: {
        visible: function visible(flag) {
          if (flag === false) {
            this.setMap(null);
          } else {
            this.setMap(this.$amap);
          }
        }
      }
    };
  },

  methods: {
    initComponent: function initComponent(options) {
      this.$amapComponent = new AMap.GroundImage(options.url, options.bounds, options);
    }
  }
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _convertHelper = __webpack_require__(5);

var _registerComponent = __webpack_require__(2);

var _registerComponent2 = _interopRequireDefault(_registerComponent);

var _compile = __webpack_require__(26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'el-amap-info-window',
  mixins: [_registerComponent2.default],
  props: ['vid', 'isCustom', 'autoMove', 'closeWhenClickMap', 'content', 'size', 'offset', 'position', 'showShadow', 'visible', 'events', 'template', 'vnode', 'contentRender'],
  data: function data() {
    var self = this;
    return {
      withSlots: false,
      propsRedirect: {
        template: 'content',
        vnode: 'content',
        contentRender: 'content'
      },
      converters: {
        template: function template(tpl) {
          return (0, _compile.compile)(tpl, self);
        },
        vnode: function vnode(_vnode) {
          var _vNode = typeof _vnode === 'function' ? _vnode(self) : _vnode;
          var vNode = (0, _compile.mountedVNode)(_vNode);
          return vNode;
        },
        contentRender: function contentRender(renderFn) {
          return (0, _compile.mountedRenderFn)(renderFn, self);
        }
      },
      handlers: {
        visible: function visible(flag) {
          var position = this.getPosition();
          if (position) {
            flag === false ? this.close() : this.open(self.$amap, [position.lng, position.lat]);
          }
        },
        template: function template(node) {
          this.setContent(node);
        }
      }
    };
  },
  destroyed: function destroyed() {
    this.$amapComponent.close();
  },

  methods: {
    initComponent: function initComponent(options) {
      if (this.withSlots) {
        options.content = this.$el;
      }
      this.$amapComponent = new AMap.InfoWindow(options);
      if (this.visible !== false) this.$amapComponent.open(this.$amap, (0, _convertHelper.toLngLat)(this.position));
    }
  },
  render: function render(h) {
    var slots = this.$slots.default || [];
    this.withSlots = !!slots.length;
    if (this.withSlots) {
      return h('div', slots);
    }
    return null;
  }
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _registerComponent = __webpack_require__(2);

var _registerComponent2 = _interopRequireDefault(_registerComponent);

var _convertHelper = __webpack_require__(5);

var _compile = __webpack_require__(26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'el-amap-marker',
  mixins: [_registerComponent2.default],
  props: ['vid', 'position', 'offset', 'icon', 'content', 'topWhenClick', 'bubble', 'draggable', 'raiseOnDrag', 'cursor', 'visible', 'zIndex', 'angle', 'autoRotation', 'animation', 'shadow', 'title', 'clickable', 'shape', 'extData', 'label', 'events', 'onceEvents', 'template', 'vnode', 'contentRender'],
  data: function data() {
    var self = this;
    return {
      withSlots: false,
      propsRedirect: {
        template: 'content',
        vnode: 'content',
        contentRender: 'content'
      },
      converters: {
        shape: function shape(options) {
          return new AMap.MarkerShape(options);
        },
        shadow: function shadow(options) {
          return new AMap.Icon(options);
        },
        template: function template(tpl) {
          return (0, _compile.compile)(tpl, self);
        },
        vnode: function vnode(_vnode) {
          var _vNode = typeof _vnode === 'function' ? _vnode(self) : _vnode;
          var vNode = (0, _compile.mountedVNode)(_vNode);
          return vNode;
        },
        contentRender: function contentRender(renderFn) {
          console.log(self);
          var template = (0, _compile.mountedRenderFn)(renderFn, self);
          return template;
        }
      },
      handlers: {
        zIndex: function zIndex(index) {
          this.setzIndex(index);
        },
        visible: function visible(flag) {
          flag === false ? this.hide() : this.show();
        }
      }
    };
  },

  methods: {
    initComponent: function initComponent(options) {
      if (this.withSlots) {
        options.content = this.$el;
      }
      this.$amapComponent = new AMap.Marker(options);
    },
    $$getExtData: function $$getExtData() {
      return this.$amapComponent.getExtData();
    },
    $$getPosition: function $$getPosition() {
      return (0, _convertHelper.lngLatTo)(this.$amapComponent.getPosition());
    },
    $$getOffset: function $$getOffset() {
      return (0, _convertHelper.pixelTo)(this.$amapComponent.getOffset());
    }
  },
  render: function render(h) {
    var slots = this.$slots.default || [];
    this.withSlots = !!slots.length;
    if (this.withSlots) {
      return h('div', slots);
    }
    return null;
  }
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _registerComponent = __webpack_require__(2);

var _registerComponent2 = _interopRequireDefault(_registerComponent);

var _editorComponent = __webpack_require__(18);

var _editorComponent2 = _interopRequireDefault(_editorComponent);

var _convertHelper = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'el-amap-polygon',
  mixins: [_registerComponent2.default, _editorComponent2.default],
  props: ['vid', 'zIndex', 'path', 'bubble', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'fillColor', 'editable', 'fillOpacity', 'extData', 'strokeStyle', 'visible', 'strokeDasharray', 'events', 'onceEvents'],
  data: function data() {
    return {
      converters: {},
      handlers: {
        visible: function visible(flag) {
          flag === false ? this.hide() : this.show();
        },
        zIndex: function zIndex(num) {
          this.setOptions({ zIndex: num });
        },
        editable: function editable(flag) {
          flag === true ? this.editor.open() : this.editor.close();
        }
      }
    };
  },

  methods: {
    initComponent: function initComponent() {
      var options = this.convertProps();
      this.$amapComponent = new AMap.Polygon(options);
      this.$amapComponent.editor = new AMap.PolyEditor(this.$amap, this.$amapComponent);
    },
    $$getPath: function $$getPath() {
      return this.$amapComponent.getPath().map(_convertHelper.lngLatTo);
    },
    $$getExtData: function $$getExtData() {
      return this.$amapComponent.getExtData();
    },
    $$contains: function $$contains(point) {
      if (Array.isArray(point)) point = new AMap.LngLat(point[0], point[1]);
      return this.$amapComponent.getBounds().contains(point);
    }
  }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _registerComponent = __webpack_require__(2);

var _registerComponent2 = _interopRequireDefault(_registerComponent);

var _editorComponent = __webpack_require__(18);

var _editorComponent2 = _interopRequireDefault(_editorComponent);

var _convertHelper = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'el-amap-polyline',
  mixins: [_registerComponent2.default, _editorComponent2.default],
  props: ['vid', 'zIndex', 'visible', 'editable', 'bubble', 'geodesic', 'isOutline', 'outlineColor', 'path', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'strokeStyle', 'strokeDasharray', 'events', 'extData', 'onceEvents', 'lineJoin'],
  data: function data() {
    return {
      converters: {},
      handlers: {
        visible: function visible(flag) {
          flag === false ? this.hide() : this.show();
        },
        editable: function editable(flag) {
          flag === true ? this.editor.open() : this.editor.close();
        }
      }
    };
  },

  methods: {
    initComponent: function initComponent(options) {
      this.$amapComponent = new AMap.Polyline(options);
      this.$amapComponent.editor = new AMap.PolyEditor(this.$amap, this.$amapComponent);
    },
    $$getPath: function $$getPath() {
      return this.$amapComponent.getPath().map(_convertHelper.lngLatTo);
    },
    $$getBounds: function $$getBounds() {
      return this.$amapComponent.getBounds();
    },
    $$getExtData: function $$getExtData() {
      return this.$amapComponent.getExtData();
    }
  }
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _registerComponent = __webpack_require__(2);

var _registerComponent2 = _interopRequireDefault(_registerComponent);

var _injectedAmapApiInstance = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'el-amap-search-box',
  mixins: [_registerComponent2.default],
  props: ['searchOption', 'onSearchResult', 'events', 'default'],
  data: function data() {
    return {
      keyword: this.default || '',
      tips: [],
      selectedTip: -1,
      loaded: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    var _loadApiPromise = _injectedAmapApiInstance.lazyAMapApiLoaderInstance.load();
    _loadApiPromise.then(function () {
      _this.loaded = true;
      _this._onSearchResult = _this.onSearchResult;

      _this.events && _this.events.init && _this.events.init({
        autoComplete: _this._autoComplete,
        placeSearch: _this._placeSearch
      });
    });
  },

  computed: {
    _autoComplete: function _autoComplete() {
      if (!this.loaded) return;
      return new AMap.Autocomplete(this.searchOption || {});
    },
    _placeSearch: function _placeSearch() {
      if (!this.loaded) return;
      return new AMap.PlaceSearch(this.searchOption || {});
    }
  },
  methods: {
    autoComplete: function autoComplete() {
      var _this2 = this;

      if (!this.keyword || !this._autoComplete) return;
      this._autoComplete.search(this.keyword, function (status, result) {
        if (status === 'complete') {
          _this2.tips = result.tips;
        }
      });
    },
    search: function search() {
      var _this3 = this;

      this.tips = [];
      if (!this._placeSearch) return;
      this._placeSearch.search(this.keyword, function (status, result) {
        if (result && result.poiList && result.poiList.count) {
          var pois = result.poiList.pois;

          var LngLats = pois.map(function (poi) {
            poi.lat = poi.location.lat;
            poi.lng = poi.location.lng;
            return poi;
          });
          _this3._onSearchResult(LngLats);
        } else if (result.poiList === undefined) {
          throw new Error(result);
        }
      });
    },
    changeTip: function changeTip(tip) {
      this.keyword = tip.name;
      this.search();
    },
    selectTip: function selectTip(type) {
      if (type === 'up' && this.selectedTip > 0) {
        this.selectedTip -= 1;
        this.keyword = this.tips[this.selectedTip].name;
      } else if (type === 'down' && this.selectedTip + 1 < this.tips.length) {
        this.selectedTip += 1;
        this.keyword = this.tips[this.selectedTip].name;
      }
    }
  }
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _guid = __webpack_require__(55);

var _guid2 = _interopRequireDefault(_guid);

var _constant = __webpack_require__(27);

var _constant2 = _interopRequireDefault(_constant);

var _convertHelper = __webpack_require__(5);

var _registerComponent = __webpack_require__(2);

var _registerComponent2 = _interopRequireDefault(_registerComponent);

var _injectedAmapApiInstance = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'el-amap',
  mixins: [_registerComponent2.default],
  props: ['vid', 'events', 'center', 'zoom', 'draggEnable', 'level', 'zooms', 'lang', 'cursor', 'crs', 'animateEnable', 'isHotspot', 'defaultLayer', 'rotateEnable', 'resizeEnable', 'showIndoorMap', 'indoorMap', 'expandZoomRange', 'dragEnable', 'zoomEnable', 'doubleClickZoom', 'keyboardEnable', 'jogEnable', 'scrollWheel', 'touchZoom', 'mapStyle', 'plugin', 'features', 'amapManager'],

  beforeCreate: function beforeCreate() {
    this._loadPromise = _injectedAmapApiInstance.lazyAMapApiLoaderInstance.load();
  },
  destroyed: function destroyed() {
    this.$amap && this.$amap.destroy();
  },


  computed: {
    plugins: function plugins() {
      var plus = [];

      var amap_prefix_reg = /^AMap./;

      var parseFullName = function parseFullName(pluginName) {
        return amap_prefix_reg.test(pluginName) ? pluginName : 'AMap.' + pluginName;
      };

      var parseShortName = function parseShortName(pluginName) {
        return pluginName.replace(amap_prefix_reg, '');
      };

      if (typeof this.plugin === 'string') {
        plus.push({
          pName: parseFullName(this.plugin),
          sName: parseShortName(this.plugin)
        });
      } else if (this.plugin instanceof Array) {
        plus = this.plugin.map(function (oPlugin) {
          var nPlugin = {};

          if (typeof oPlugin === 'string') {
            nPlugin = {
              pName: parseFullName(oPlugin),
              sName: parseShortName(oPlugin)
            };
          } else {
            oPlugin.pName = parseFullName(oPlugin.pName);
            oPlugin.sName = parseShortName(oPlugin.pName);
            nPlugin = oPlugin;
          }

          return nPlugin;
        });
      }

      return plus;
    }
  },

  data: function data() {
    return {
      converters: {
        center: function center(arr) {
          return (0, _convertHelper.toLngLat)(arr);
        }
      },
      handlers: {
        zoomEnable: function zoomEnable(flag) {
          this.setStatus({ zoomEnable: flag });
        },
        dragEnable: function dragEnable(flag) {
          this.setStatus({ dragEnable: flag });
        },
        rotateEnable: function rotateEnable(flag) {
          this.setStatus({ rotateEnable: flag });
        }
      }
    };
  },
  mounted: function mounted() {
    this.createMap();
  },
  addEvents: function addEvents() {
    var _this = this;

    this.$amapComponent.on('moveend', function () {
      var centerLngLat = _this.$amapComponent.getCenter();
      _this.center = [centerLngLat.getLng(), centerLngLat.getLat()];
    });
  },


  methods: {
    addPlugins: function addPlugins() {
      var _notInjectPlugins = this.plugins.filter(function (_plugin) {
        return !AMap[_plugin.sName];
      });

      if (!_notInjectPlugins || !_notInjectPlugins.length) return this.addMapControls();
      return this.$amapComponent.plugin(_notInjectPlugins, this.addMapControls);
    },
    addMapControls: function addMapControls() {
      var _this2 = this;

      if (!this.plugins || !this.plugins.length) return;

      this.$plugins = this.$plugins || {};

      this.plugins.forEach(function (_plugin) {
        var realPlugin = _this2.convertAMapPluginProps(_plugin);
        _this2.$plugins[realPlugin.pName] = new AMap[realPlugin.sName](realPlugin);

        _this2.$amapComponent.addControl(_this2.$plugins[realPlugin.pName]);

        if (_plugin.events) {
          if (realPlugin.events.init) {
            realPlugin.events.init(_this2.$plugins[realPlugin.pName]);
          }

          for (var k in _plugin.events) {
            var v = _plugin.events[k];
            if (k === 'init') continue;
            AMap.event.addListener(_this2.$plugins[realPlugin.pName], k, v);
          }
        }
      });
    },
    convertAMapPluginProps: function convertAMapPluginProps(plugin) {

      if ((typeof plugin === 'undefined' ? 'undefined' : _typeof(plugin)) === 'object' && plugin.pName) {
        switch (plugin.pName) {
          case 'AMap.ToolBar':
            {
              if (plugin.offset && plugin.offset instanceof Array) {
                plugin.offset = (0, _convertHelper.toPixel)(plugin.offset);
              }
              break;
            }
          case 'AMap.Scale':
            {
              if (plugin.offset && plugin.offset instanceof Array) {
                plugin.offset = (0, _convertHelper.toPixel)(plugin.offset);
              }
              break;
            }
        }
        return plugin;
      } else {
        return '';
      }
    },
    setStatus: function setStatus(option) {
      this.$amap.setStatus(option);
    },
    createMap: function createMap() {
      var _this3 = this;

      this._loadPromise.then(function () {
        var mapElement = _this3.$el.querySelector('.el-vue-amap');
        var elementID = _this3.vid || (0, _guid2.default)();
        mapElement.id = elementID;
        _this3.$amap = _this3.$amapComponent = new AMap.Map(elementID, _this3.convertProps());
        if (_this3.amapManager) _this3.amapManager.setMap(_this3.$amap);
        _this3.$emit(_constant2.default.AMAP_READY_EVENT, _this3.$amap);
        _this3.$children.forEach(function (component) {
          component.$emit(_constant2.default.AMAP_READY_EVENT, _this3.$amap);
        });
        if (_this3.plugins && _this3.plugins.length) {
          _this3.addPlugins();
        }
      });
    },
    $$getCenter: function $$getCenter() {
      if (!this.$amap) return (0, _convertHelper.lngLatTo)(this.center);
      return (0, _convertHelper.lngLatTo)(this.$amap.getCenter());
    }
  }
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	var str = [].map.call(arguments, function (str) {
		return str.trim();
	}).filter(function (str) {
		return str.length;
	}).join('-');

	if (!str.length) {
		return '';
	}

	if (str.length === 1 || !(/[_.\- ]+/).test(str) ) {
		if (str[0] === str[0].toLowerCase() && str.slice(1) !== str.slice(1).toLowerCase()) {
			return str;
		}

		return str.toLowerCase();
	}

	return str
	.replace(/^[_.\- ]+/, '')
	.toLowerCase()
	.replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
		return p1.toUpperCase();
	});
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(93);
__webpack_require__(94);
__webpack_require__(95);
__webpack_require__(92);
module.exports = __webpack_require__(13).Map;


/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(0)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(9)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(16);
var toLength = __webpack_require__(43);
var toAbsoluteIndex = __webpack_require__(88);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(10).f;
var create = __webpack_require__(39);
var redefineAll = __webpack_require__(41);
var ctx = __webpack_require__(14);
var anInstance = __webpack_require__(29);
var forOf = __webpack_require__(35);
var $iterDefine = __webpack_require__(21);
var step = __webpack_require__(37);
var setSpecies = __webpack_require__(86);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(38).fastKey;
var validate = __webpack_require__(45);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(1);
var $export = __webpack_require__(34);
var redefine = __webpack_require__(11);
var redefineAll = __webpack_require__(41);
var meta = __webpack_require__(38);
var forOf = __webpack_require__(35);
var anInstance = __webpack_require__(29);
var isObject = __webpack_require__(3);
var fails = __webpack_require__(15);
var $iterDetect = __webpack_require__(78);
var setToStringTag = __webpack_require__(23);
var inheritIfRequired = __webpack_require__(73);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
var setPrototypeOf = __webpack_require__(85).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(31);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(12);
var ITERATOR = __webpack_require__(0)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(8);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(39);
var descriptor = __webpack_require__(22);
var setToStringTag = __webpack_require__(23);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(0)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(0)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var anObject = __webpack_require__(8);
var getKeys = __webpack_require__(40);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(84);
var createDesc = __webpack_require__(22);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(44);
var has = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(36);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(7);
var toObject = __webpack_require__(89);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(7);
var toIObject = __webpack_require__(16);
var arrayIndexOf = __webpack_require__(69)(false);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 84 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(3);
var anObject = __webpack_require__(8);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(14)(Function.call, __webpack_require__(81).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(1);
var dP = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(0)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25);
var defined = __webpack_require__(20);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(20);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(30);
var ITERATOR = __webpack_require__(0)('iterator');
var Iterators = __webpack_require__(12);
module.exports = __webpack_require__(13).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(68);
var step = __webpack_require__(37);
var Iterators = __webpack_require__(12);
var toIObject = __webpack_require__(16);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(21)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(70);
var validate = __webpack_require__(45);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(71)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(30);
var test = {};
test[__webpack_require__(0)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(11)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(87)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(21)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(91);
var getKeys = __webpack_require__(40);
var redefine = __webpack_require__(11);
var global = __webpack_require__(1);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(12);
var wks = __webpack_require__(0);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(46)(false);
// imports


// module
exports.push([module.i, ".el-vue-search-box-container{position:relative;width:360px;height:45px;background:#fff;box-shadow:0 2px 2px rgba(0,0,0,.15);border-radius:2px 3px 3px 2px;z-index:10}.el-vue-search-box-container .search-box-wrapper{position:absolute;display:flex;align-items:center;left:0;top:0;width:100%;height:100%;box-sizing:border-box}.el-vue-search-box-container .search-box-wrapper input{flex:1;height:20px;line-height:20px;letter-spacing:.5px;font-size:14px;text-indent:10px;box-sizing:border-box;border:none;outline:none}.el-vue-search-box-container .search-box-wrapper .search-btn{width:45px;height:100%;display:flex;align-items:center;justify-content:center;background:transparent;cursor:pointer}.el-vue-search-box-container .search-tips{position:absolute;top:100%;border:1px solid #dbdbdb;background:#fff;overflow:auto}.el-vue-search-box-container .search-tips ul{padding:0;margin:0}.el-vue-search-box-container .search-tips ul li{height:40px;line-height:40px;box-shadow:0 1px 1px rgba(0,0,0,.1);padding:0 10px;cursor:pointer}.el-vue-search-box-container .search-tips ul li.autocomplete-selected{background:#eee}", ""]);

// exports


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(46)(false);
// imports


// module
exports.push([module.i, ".el-vue-amap-container,.el-vue-amap-container .el-vue-amap{height:100%}", ""]);

// exports


/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_circle_vue__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_circle_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_circle_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ede0231_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_amap_circle_vue__ = __webpack_require__(111);
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_circle_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ede0231_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_amap_circle_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_ground_image_vue__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_ground_image_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_ground_image_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1e5e5b7e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_amap_ground_image_vue__ = __webpack_require__(109);
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_ground_image_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1e5e5b7e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_amap_ground_image_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_info_window_vue__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_info_window_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_info_window_vue__);
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_info_window_vue___default.a,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_marker_vue__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_marker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_marker_vue__);
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_marker_vue___default.a,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_polygon_vue__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_polygon_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_polygon_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1884c3dd_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_amap_polygon_vue__ = __webpack_require__(108);
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_polygon_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1884c3dd_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_amap_polygon_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_polyline_vue__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_polyline_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_polyline_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0859d18d_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_amap_polyline_vue__ = __webpack_require__(107);
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_polyline_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0859d18d_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_amap_polyline_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_search_box_vue__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_search_box_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_search_box_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_04fb2ab2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_amap_search_box_vue__ = __webpack_require__(106);
function injectStyle (ssrContext) {
  __webpack_require__(112)
}
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_search_box_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_04fb2ab2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_amap_search_box_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_vue__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_235b4446_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_amap_vue__ = __webpack_require__(110);
function injectStyle (ssrContext) {
  __webpack_require__(113)
}
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_amap_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_235b4446_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_amap_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-vue-search-box-container",on:{"keydown":[function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"up",38,$event.key)){ return null; }_vm.selectTip('up')},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"down",40,$event.key)){ return null; }_vm.selectTip('down')}]}},[_c('div',{staticClass:"search-box-wrapper"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.keyword),expression:"keyword"}],attrs:{"type":"text"},domProps:{"value":(_vm.keyword)},on:{"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }_vm.search($event)},"input":[function($event){if($event.target.composing){ return; }_vm.keyword=$event.target.value},_vm.autoComplete]}}),_vm._v(" "),_c('span',{staticClass:"search-btn",on:{"click":_vm.search}},[_vm._v("搜索")])]),_vm._v(" "),_c('div',{staticClass:"search-tips"},[_c('ul',_vm._l((_vm.tips),function(tip,index){return _c('li',{key:index,class:{'autocomplete-selected': index === _vm.selectedTip},on:{"click":function($event){_vm.changeTip(tip)},"mouseover":function($event){_vm.selectedTip=index}}},[_vm._v(_vm._s(tip.name))])}))])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c("div")}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c("div")}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c("div")}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-vue-amap-container"},[_c('div',{staticClass:"el-vue-amap"}),_vm._v(" "),_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c("div")}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(96);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(48)("3b1a999c", content, true);

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(97);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(48)("2c7d16c4", content, true);

/***/ }),
/* 114 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(50);


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map