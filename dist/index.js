'use strict';

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
    if (!RE_HEX.test(hex)) throw new Error('Invalid HEX color.');
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