/*! @license MIT. https://github.com/onury/invert-color */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("invert", [], factory);
	else if(typeof exports === 'object')
		exports["invert"] = factory();
	else
		root["invert"] = factory();
})(this, function() {
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "lib/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/invert.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/invert.ts":
/*!***********************!*\
  !*** ./src/invert.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// -------------------------------
// TYPES / INTERFACES
// -------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
// -------------------------------
// CONSTANTS
// -------------------------------
var BW_THRESHOLD = Math.sqrt(1.05 * 0.05) - 0.05;
var RE_HEX = /^(?:[0-9a-f]{3}){1,2}$/i;
var DEFAULT_BW = {
    black: '#000000',
    white: '#ffffff'
};
// -------------------------------
// HELPER METHODS
// -------------------------------
function padz(str, len) {
    if (len === void 0) { len = 2; }
    return (new Array(len).join('0') + str).slice(-len);
}
function hexToRgbArray(hex) {
    if (hex.slice(0, 1) === '#')
        hex = hex.slice(1);
    if (!RE_HEX.test(hex))
        throw new Error("Invalid HEX color: \"" + hex + "\"");
    // normalize / convert 3-chars hex to 6-chars.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16) // b
    ];
}
function toRGB(c) {
    return { r: c[0], g: c[1], b: c[2] };
}
function toRgbArray(c) {
    if (!c)
        throw new Error('Invalid color value');
    if (Array.isArray(c))
        return c;
    return typeof c === 'string' ? hexToRgbArray(c) : [c.r, c.g, c.b];
}
// http://stackoverflow.com/a/3943023/112731
function getLuminance(c) {
    var i, x;
    var a = []; // so we don't mutate
    for (i = 0; i < c.length; i++) {
        x = c[i] / 255;
        a[i] = x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}
function invertToBW(color, bw, asArr) {
    var colors = (bw === true)
        ? DEFAULT_BW
        : Object.assign({}, DEFAULT_BW, bw);
    return getLuminance(color) > BW_THRESHOLD
        ? (asArr ? hexToRgbArray(colors.black) : colors.black)
        : (asArr ? hexToRgbArray(colors.white) : colors.white);
}
// -------------------------------
// PUBLIC MEMBERS
// -------------------------------
/**
 *  Generates inverted (opposite) version of the given color.
 *  @param {Color} color - Color to be inverted.
 *  @param {BlackWhite|boolean} [bw=false] - Whether to amplify the inversion to
 *  black or white. Provide an object to customize black/white colors.
 *  @returns {HexColor} - Hexadecimal representation of the inverted color.
 */
function invert(color, bw) {
    if (bw === void 0) { bw = false; }
    color = toRgbArray(color);
    if (bw)
        return invertToBW(color, bw);
    return '#' + color.map(function (c) { return padz((255 - c).toString(16)); }).join('');
}
exports.invert = invert;
/**
 *  Utility methods to generate inverted version of a color.
 *  @namespace
 */
(function (invert) {
    /**
     *  Generates inverted (opposite) version of the given color, as a RGB object.
     *  @alias invert.asRgbObject
     *  @param {Color} color - Color to be inverted.
     *  @param {BlackWhite|boolean} [bw=false] - Whether to amplify the inversion to
     *  black or white. Provide an object to customize black/white colors.
     *  @returns {RGB} - RGB object representation of the inverted color.
     */
    function asRGB(color, bw) {
        if (bw === void 0) { bw = false; }
        color = toRgbArray(color);
        var list = bw
            ? invertToBW(color, bw, true)
            : color.map(function (c) { return 255 - c; });
        return toRGB(list);
    }
    invert.asRGB = asRGB;
    /**
     *  Generates inverted (opposite) version of the given color, as a RGB array.
     *  @param {Color} color - Color to be inverted.
     *  @param {BlackWhite|boolean} [bw=false] - Whether to amplify the inversion to
     *  black or white. Provide an object to customize black/white colors.
     *  @returns {RGB} - RGB array representation of the inverted color.
     */
    function asRgbArray(color, bw) {
        if (bw === void 0) { bw = false; }
        color = toRgbArray(color);
        return bw
            ? invertToBW(color, bw, true)
            : color.map(function (c) { return 255 - c; });
    }
    invert.asRgbArray = asRgbArray;
    /**
     *  Alias of `.asRGB()`
     */
    invert.asRgbObject = asRGB;
})(invert || (invert = {}));
exports.invert = invert;
// -------------------------------
// EXPORT
// -------------------------------
// dual export
exports.default = invert;


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbnZlcnQvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2ludmVydC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pbnZlcnQvLi9zcmMvaW52ZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLEVBQUUsRUFBRSxJQUFJO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsU0FBUztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixlQUFlLGNBQWM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE1BQU07QUFDbEIsWUFBWSxtQkFBbUI7QUFDL0I7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxxQ0FBcUMsRUFBRTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQSxrQkFBa0IsSUFBSTtBQUN0QjtBQUNBO0FBQ0EsNEJBQTRCLFlBQVk7QUFDeEM7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGdCQUFnQixFQUFFO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0Esa0JBQWtCLElBQUk7QUFDdEI7QUFDQTtBQUNBLDRCQUE0QixZQUFZO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxnQkFBZ0IsRUFBRTtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdCQUF3QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW52ZXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJpbnZlcnRcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiaW52ZXJ0XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImludmVydFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwibGliL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbnZlcnQudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFRZUEVTIC8gSU5URVJGQUNFU1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQ09OU1RBTlRTXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG52YXIgQldfVEhSRVNIT0xEID0gTWF0aC5zcXJ0KDEuMDUgKiAwLjA1KSAtIDAuMDU7XG52YXIgUkVfSEVYID0gL14oPzpbMC05YS1mXXszfSl7MSwyfSQvaTtcbnZhciBERUZBVUxUX0JXID0ge1xuICAgIGJsYWNrOiAnIzAwMDAwMCcsXG4gICAgd2hpdGU6ICcjZmZmZmZmJ1xufTtcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEhFTFBFUiBNRVRIT0RTXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mdW5jdGlvbiBwYWR6KHN0ciwgbGVuKSB7XG4gICAgaWYgKGxlbiA9PT0gdm9pZCAwKSB7IGxlbiA9IDI7IH1cbiAgICByZXR1cm4gKG5ldyBBcnJheShsZW4pLmpvaW4oJzAnKSArIHN0cikuc2xpY2UoLWxlbik7XG59XG5mdW5jdGlvbiBoZXhUb1JnYkFycmF5KGhleCkge1xuICAgIGlmIChoZXguc2xpY2UoMCwgMSkgPT09ICcjJylcbiAgICAgICAgaGV4ID0gaGV4LnNsaWNlKDEpO1xuICAgIGlmICghUkVfSEVYLnRlc3QoaGV4KSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBIRVggY29sb3I6IFxcXCJcIiArIGhleCArIFwiXFxcIlwiKTtcbiAgICAvLyBub3JtYWxpemUgLyBjb252ZXJ0IDMtY2hhcnMgaGV4IHRvIDYtY2hhcnMuXG4gICAgaWYgKGhleC5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgaGV4ID0gaGV4WzBdICsgaGV4WzBdICsgaGV4WzFdICsgaGV4WzFdICsgaGV4WzJdICsgaGV4WzJdO1xuICAgIH1cbiAgICByZXR1cm4gW1xuICAgICAgICBwYXJzZUludChoZXguc2xpY2UoMCwgMiksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnNsaWNlKDIsIDQpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zbGljZSg0LCA2KSwgMTYpIC8vIGJcbiAgICBdO1xufVxuZnVuY3Rpb24gdG9SR0IoYykge1xuICAgIHJldHVybiB7IHI6IGNbMF0sIGc6IGNbMV0sIGI6IGNbMl0gfTtcbn1cbmZ1bmN0aW9uIHRvUmdiQXJyYXkoYykge1xuICAgIGlmICghYylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvbG9yIHZhbHVlJyk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYykpXG4gICAgICAgIHJldHVybiBjO1xuICAgIHJldHVybiB0eXBlb2YgYyA9PT0gJ3N0cmluZycgPyBoZXhUb1JnYkFycmF5KGMpIDogW2MuciwgYy5nLCBjLmJdO1xufVxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk0MzAyMy8xMTI3MzFcbmZ1bmN0aW9uIGdldEx1bWluYW5jZShjKSB7XG4gICAgdmFyIGksIHg7XG4gICAgdmFyIGEgPSBbXTsgLy8gc28gd2UgZG9uJ3QgbXV0YXRlXG4gICAgZm9yIChpID0gMDsgaSA8IGMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgeCA9IGNbaV0gLyAyNTU7XG4gICAgICAgIGFbaV0gPSB4IDw9IDAuMDM5MjggPyB4IC8gMTIuOTIgOiBNYXRoLnBvdygoeCArIDAuMDU1KSAvIDEuMDU1LCAyLjQpO1xuICAgIH1cbiAgICByZXR1cm4gMC4yMTI2ICogYVswXSArIDAuNzE1MiAqIGFbMV0gKyAwLjA3MjIgKiBhWzJdO1xufVxuZnVuY3Rpb24gaW52ZXJ0VG9CVyhjb2xvciwgYncsIGFzQXJyKSB7XG4gICAgdmFyIGNvbG9ycyA9IChidyA9PT0gdHJ1ZSlcbiAgICAgICAgPyBERUZBVUxUX0JXXG4gICAgICAgIDogT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9CVywgYncpO1xuICAgIHJldHVybiBnZXRMdW1pbmFuY2UoY29sb3IpID4gQldfVEhSRVNIT0xEXG4gICAgICAgID8gKGFzQXJyID8gaGV4VG9SZ2JBcnJheShjb2xvcnMuYmxhY2spIDogY29sb3JzLmJsYWNrKVxuICAgICAgICA6IChhc0FyciA/IGhleFRvUmdiQXJyYXkoY29sb3JzLndoaXRlKSA6IGNvbG9ycy53aGl0ZSk7XG59XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQVUJMSUMgTUVNQkVSU1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyoqXG4gKiAgR2VuZXJhdGVzIGludmVydGVkIChvcHBvc2l0ZSkgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gY29sb3IuXG4gKiAgQHBhcmFtIHtDb2xvcn0gY29sb3IgLSBDb2xvciB0byBiZSBpbnZlcnRlZC5cbiAqICBAcGFyYW0ge0JsYWNrV2hpdGV8Ym9vbGVhbn0gW2J3PWZhbHNlXSAtIFdoZXRoZXIgdG8gYW1wbGlmeSB0aGUgaW52ZXJzaW9uIHRvXG4gKiAgYmxhY2sgb3Igd2hpdGUuIFByb3ZpZGUgYW4gb2JqZWN0IHRvIGN1c3RvbWl6ZSBibGFjay93aGl0ZSBjb2xvcnMuXG4gKiAgQHJldHVybnMge0hleENvbG9yfSAtIEhleGFkZWNpbWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBpbnZlcnRlZCBjb2xvci5cbiAqL1xuZnVuY3Rpb24gaW52ZXJ0KGNvbG9yLCBidykge1xuICAgIGlmIChidyA9PT0gdm9pZCAwKSB7IGJ3ID0gZmFsc2U7IH1cbiAgICBjb2xvciA9IHRvUmdiQXJyYXkoY29sb3IpO1xuICAgIGlmIChidylcbiAgICAgICAgcmV0dXJuIGludmVydFRvQlcoY29sb3IsIGJ3KTtcbiAgICByZXR1cm4gJyMnICsgY29sb3IubWFwKGZ1bmN0aW9uIChjKSB7IHJldHVybiBwYWR6KCgyNTUgLSBjKS50b1N0cmluZygxNikpOyB9KS5qb2luKCcnKTtcbn1cbmV4cG9ydHMuaW52ZXJ0ID0gaW52ZXJ0O1xuLyoqXG4gKiAgVXRpbGl0eSBtZXRob2RzIHRvIGdlbmVyYXRlIGludmVydGVkIHZlcnNpb24gb2YgYSBjb2xvci5cbiAqICBAbmFtZXNwYWNlXG4gKi9cbihmdW5jdGlvbiAoaW52ZXJ0KSB7XG4gICAgLyoqXG4gICAgICogIEdlbmVyYXRlcyBpbnZlcnRlZCAob3Bwb3NpdGUpIHZlcnNpb24gb2YgdGhlIGdpdmVuIGNvbG9yLCBhcyBhIFJHQiBvYmplY3QuXG4gICAgICogIEBhbGlhcyBpbnZlcnQuYXNSZ2JPYmplY3RcbiAgICAgKiAgQHBhcmFtIHtDb2xvcn0gY29sb3IgLSBDb2xvciB0byBiZSBpbnZlcnRlZC5cbiAgICAgKiAgQHBhcmFtIHtCbGFja1doaXRlfGJvb2xlYW59IFtidz1mYWxzZV0gLSBXaGV0aGVyIHRvIGFtcGxpZnkgdGhlIGludmVyc2lvbiB0b1xuICAgICAqICBibGFjayBvciB3aGl0ZS4gUHJvdmlkZSBhbiBvYmplY3QgdG8gY3VzdG9taXplIGJsYWNrL3doaXRlIGNvbG9ycy5cbiAgICAgKiAgQHJldHVybnMge1JHQn0gLSBSR0Igb2JqZWN0IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBpbnZlcnRlZCBjb2xvci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc1JHQihjb2xvciwgYncpIHtcbiAgICAgICAgaWYgKGJ3ID09PSB2b2lkIDApIHsgYncgPSBmYWxzZTsgfVxuICAgICAgICBjb2xvciA9IHRvUmdiQXJyYXkoY29sb3IpO1xuICAgICAgICB2YXIgbGlzdCA9IGJ3XG4gICAgICAgICAgICA/IGludmVydFRvQlcoY29sb3IsIGJ3LCB0cnVlKVxuICAgICAgICAgICAgOiBjb2xvci5tYXAoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIDI1NSAtIGM7IH0pO1xuICAgICAgICByZXR1cm4gdG9SR0IobGlzdCk7XG4gICAgfVxuICAgIGludmVydC5hc1JHQiA9IGFzUkdCO1xuICAgIC8qKlxuICAgICAqICBHZW5lcmF0ZXMgaW52ZXJ0ZWQgKG9wcG9zaXRlKSB2ZXJzaW9uIG9mIHRoZSBnaXZlbiBjb2xvciwgYXMgYSBSR0IgYXJyYXkuXG4gICAgICogIEBwYXJhbSB7Q29sb3J9IGNvbG9yIC0gQ29sb3IgdG8gYmUgaW52ZXJ0ZWQuXG4gICAgICogIEBwYXJhbSB7QmxhY2tXaGl0ZXxib29sZWFufSBbYnc9ZmFsc2VdIC0gV2hldGhlciB0byBhbXBsaWZ5IHRoZSBpbnZlcnNpb24gdG9cbiAgICAgKiAgYmxhY2sgb3Igd2hpdGUuIFByb3ZpZGUgYW4gb2JqZWN0IHRvIGN1c3RvbWl6ZSBibGFjay93aGl0ZSBjb2xvcnMuXG4gICAgICogIEByZXR1cm5zIHtSR0J9IC0gUkdCIGFycmF5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBpbnZlcnRlZCBjb2xvci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc1JnYkFycmF5KGNvbG9yLCBidykge1xuICAgICAgICBpZiAoYncgPT09IHZvaWQgMCkgeyBidyA9IGZhbHNlOyB9XG4gICAgICAgIGNvbG9yID0gdG9SZ2JBcnJheShjb2xvcik7XG4gICAgICAgIHJldHVybiBid1xuICAgICAgICAgICAgPyBpbnZlcnRUb0JXKGNvbG9yLCBidywgdHJ1ZSlcbiAgICAgICAgICAgIDogY29sb3IubWFwKGZ1bmN0aW9uIChjKSB7IHJldHVybiAyNTUgLSBjOyB9KTtcbiAgICB9XG4gICAgaW52ZXJ0LmFzUmdiQXJyYXkgPSBhc1JnYkFycmF5O1xuICAgIC8qKlxuICAgICAqICBBbGlhcyBvZiBgLmFzUkdCKClgXG4gICAgICovXG4gICAgaW52ZXJ0LmFzUmdiT2JqZWN0ID0gYXNSR0I7XG59KShpbnZlcnQgfHwgKGludmVydCA9IHt9KSk7XG5leHBvcnRzLmludmVydCA9IGludmVydDtcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEVYUE9SVFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gZHVhbCBleHBvcnRcbmV4cG9ydHMuZGVmYXVsdCA9IGludmVydDtcbiJdLCJzb3VyY2VSb290IjoiIn0=