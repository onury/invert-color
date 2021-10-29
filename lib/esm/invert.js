// -------------------------------
// TYPES / INTERFACES
// -------------------------------
// -------------------------------
// CONSTANTS
// -------------------------------
const DEFAULT_THRESHOLD = Math.sqrt(1.05 * 0.05) - 0.05;
const RE_HEX = /^(?:[0-9a-f]{3}){1,2}$/i;
const DEFAULT_BW = {
    black: '#000000',
    white: '#ffffff',
    threshold: DEFAULT_THRESHOLD
};
// -------------------------------
// HELPER METHODS
// -------------------------------
function padz(str, len = 2) {
    return (new Array(len).join('0') + str).slice(-len);
}
function hexToRgbArray(hex) {
    if (hex.slice(0, 1) === '#')
        hex = hex.slice(1);
    if (!RE_HEX.test(hex))
        throw new Error(`Invalid HEX color: "${hex}"`);
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
    let i, x;
    const a = []; // so we don't mutate
    for (i = 0; i < c.length; i++) {
        x = c[i] / 255;
        a[i] = x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}
function invertToBW(color, bw, asArr) {
    const options = (bw === true)
        ? DEFAULT_BW
        : Object.assign({}, DEFAULT_BW, bw);
    return getLuminance(color) > options.threshold
        ? (asArr ? hexToRgbArray(options.black) : options.black)
        : (asArr ? hexToRgbArray(options.white) : options.white);
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
function invert(color, bw = false) {
    let isRgbString = false;
    let isRgbaString = false;
    if (typeof color === 'string' && color.startsWith('rgb')) {
        if (color.startsWith('rgba')) {
            isRgbaString = true;
        }
        else {
            isRgbString = true;
        }
    }
    if (isRgbString) {
        const matches = color.match(/rgb\(([0-9 ]+),([0-9 ]+),([0-9 ]+)\)/);
        if (matches) {
            let rgbArr = [
                parseInt(matches[1]),
                parseInt(matches[2]),
                parseInt(matches[3]),
            ];
            rgbArr = bw
                ? invertToBW(rgbArr, bw, true)
                : rgbArr.map(c => 255 - c);
            return `rgb(${rgbArr.join(',')})`;
        }
        else {
            throw new Error('Invalid rgb color string: ' + color);
        }
    }
    else if (isRgbaString) {
        const matches = color.match(/rgba\(([0-9 ]+),([0-9 ]+),([0-9 ]+),([0-9. ]+)\)/);
        if (matches) {
            let rgbArr = [
                parseInt(matches[1]),
                parseInt(matches[2]),
                parseInt(matches[3]),
            ];
            const alphaChannel = matches[4].replace(/\s/g, '');
            rgbArr = bw
                ? invertToBW(rgbArr, bw, true)
                : rgbArr.map(c => 255 - c);
            return `rgba(${rgbArr.join(',')},${alphaChannel})`;
        }
        else {
            throw new Error('Invalid rgba color string: ' + color);
        }
    }
    else {
        color = toRgbArray(color);
        if (bw)
            return invertToBW(color, bw);
        return '#' + color.map(c => padz((255 - c).toString(16))).join('');
    }
}
/**
 *  Utility methods to generate inverted version of a color.
 *  @namespace
 */
(function (invert) {
    /**
     *  Generates inverted (opposite) version of the given color, as a RGB object.
     *  @alias invert.asRgbObject
     *  @param {Color} color - Color to be inverted.
     *  @param {BlackWhite|boolean} [bw] - Whether to amplify the inversion to
     *  black or white. Provide an object to customize black/white colors.
     *  @returns {RGB} - RGB object representation of the inverted color.
     */
    function asRGB(color, bw) {
        color = toRgbArray(color);
        const list = bw
            ? invertToBW(color, bw, true)
            : color.map(c => 255 - c);
        return toRGB(list);
    }
    invert.asRGB = asRGB;
    /**
     *  Generates inverted (opposite) version of the given color, as a RGB array.
     *  @param {Color} color - Color to be inverted.
     *  @param {BlackWhite|boolean} [bw] - Whether to amplify the inversion to
     *  black or white. Provide an object to customize black/white colors.
     *  @returns {RGB} - RGB array representation of the inverted color.
     */
    function asRgbArray(color, bw) {
        color = toRgbArray(color);
        return bw
            ? invertToBW(color, bw, true)
            : color.map(c => 255 - c);
    }
    invert.asRgbArray = asRgbArray;
    /**
     *  Default luminance threshold used for amplifying inversion to black and
     *  white.
     *  @type {number}
     */
    invert.defaultThreshold = DEFAULT_THRESHOLD;
    /**
     *  Alias of `.asRGB()`
     */
    invert.asRgbObject = asRGB;
})(invert || (invert = {}));
// -------------------------------
// EXPORT
// -------------------------------
export default invert;
