(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("invert", [], factory);
	else if(typeof exports === 'object')
		exports["invert"] = factory();
	else
		root["invert"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	__webpack_require__.p = "lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BW_THRESHOLD = Math.sqrt(1.05 * 0.05) - 0.05;
var RE_HEX = /^(?:[0-9a-f]{3}){1,2}$/i;
var DEFAULT_BW_COLORS = {
    black: '#000000',
    white: '#ffffff'
};

function padz(str, len) {
    len = len || 2;
    return (new Array(len).join('0') + str).slice(-len);
}

function toObj(c) {
    return { r: c[0], g: c[1], b: c[2] };
}

function hexToRGB(hex) {
    if (hex.slice(0, 1) === '#') hex = hex.slice(1);
    if (!RE_HEX.test(hex)) throw new Error('Invalid HEX color: "' + hex + '"');
    // normalize / convert 3-chars hex to 6-chars.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return [parseInt(hex.slice(0, 2), 16), // r
    parseInt(hex.slice(2, 4), 16), // g
    parseInt(hex.slice(4, 6), 16) // b
    ];
}

// c = String (hex) | Array [r, g, b] | Object {r, g, b}
function toRGB(c) {
    if (Array.isArray(c)) return c;
    return typeof c === 'string' ? hexToRGB(c) : [c.r, c.g, c.b];
}

// http://stackoverflow.com/a/3943023/112731
function getLuminance(c) {
    var i = void 0,
        x = void 0;
    var a = []; // so we don't mutate
    for (i = 0; i < c.length; i++) {
        x = c[i] / 255;
        a[i] = x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function invertToBW(color, bw, asArr) {
    var colors = bw === true ? DEFAULT_BW_COLORS : Object.assign({}, DEFAULT_BW_COLORS, bw);
    return getLuminance(color) > BW_THRESHOLD ? asArr ? hexToRGB(colors.black) : colors.black : asArr ? hexToRGB(colors.white) : colors.white;
}

function invert(color, bw) {
    color = toRGB(color);
    if (bw) return invertToBW(color, bw);
    return '#' + color.map(function (c) {
        return padz((255 - c).toString(16));
    }).join('');
}

invert.asRgbArray = function (color, bw) {
    color = toRGB(color);
    return bw ? invertToBW(color, bw, true) : color.map(function (c) {
        return 255 - c;
    });
};

invert.asRgbObject = function (color, bw) {
    color = toRGB(color);
    return toObj(bw ? invertToBW(color, bw, true) : color.map(function (c) {
        return 255 - c;
    }));
};

module.exports = invert;

/***/ })
/******/ ]);
});
//# sourceMappingURL=invert.js.map