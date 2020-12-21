/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./loaders/css-loader.js??ruleSet[1].rules[0].use[1]!./src/global.css":
/*!****************************************************************************!*\
  !*** ./loaders/css-loader.js??ruleSet[1].rules[0].use[1]!./src/global.css ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


      var list = [];
      list.toString = function () {return this.join('')}
      
      list.push(`body {
    background: #61214f;
}

#app {
    background-image: url('`+__webpack_require__(/*! ./img/logo.png */ "./src/img/logo.png")+`');
    background-size: contain;
    width: 250px;
    height: 250px;
}`);
      module.exports = list;
    

/***/ }),

/***/ "./loaders/css-loader.js??ruleSet[1].rules[0].use[1]!./src/index.css":
/*!***************************************************************************!*\
  !*** ./loaders/css-loader.js??ruleSet[1].rules[0].use[1]!./src/index.css ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


      var list = [];
      list.toString = function () {return this.join('')}
      list.push(...__webpack_require__(/*! -!../loaders/css-loader.js??ruleSet[1].rules[0].use[1]!./global.css */ "./loaders/css-loader.js??ruleSet[1].rules[0].use[1]!./src/global.css"));
      list.push(`body {
    color: #111
}`);
      module.exports = list;
    

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


    var style = document.createElement("style");
    style.innerHTML = __webpack_require__(/*! !!../loaders/css-loader.js??ruleSet[1].rules[0].use[1]!./index.css */ "./loaders/css-loader.js??ruleSet[1].rules[0].use[1]!./src/index.css");
    document.head.appendChild(style);
 

/***/ }),

/***/ "./src/img/logo.png":
/*!**************************!*\
  !*** ./src/img/logo.png ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "25a1547434c69b34805112b3e5f583a7.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const css = __webpack_require__(/*! ./index.css */ "./src/index.css");
console.log(css);
})();

/******/ })()
;