# invert-color

[![build-status](https://img.shields.io/travis/onury/invert-color.svg?branch=master)](https://travis-ci.org/onury/invert-color)
[![npm](http://img.shields.io/npm/v/invert-color.svg)](https://www.npmjs.com/package/invert-color)
[![release](https://img.shields.io/github/release/onury/invert-color.svg)](https://github.com/onury/invert-color)
[![license](http://img.shields.io/npm/l/invert-color.svg)](https://github.com/onury/invert-color/blob/master/LICENSE)
[![dependencies](https://david-dm.org/onury/invert-color.svg)](https://david-dm.org/onury/invert-color)
[![maintained](https://img.shields.io/maintenance/yes/2017.svg)](https://github.com/onury/invert-color/graphs/commit-activity)

> © 2017, Onur Yıldırım ([@onury](https://github.com/onury)). MIT License.

Generates inverted (opposite) version of the given color. 

_This passes a long test suite of **Adobe Photoshop CC** inverted colors...   
Generating exactly the same results with it._

![Invert Animation](https://github.com/onury/invert-color/blob/master/test/anim/invert-animation.gif?raw=true)

## Installation

```sh
npm i invert-color --save
```

## Usage

```js
const invert = require('invert-color');
```

### `invert(color[, bw])`

- **`color`** : `String|Array|Object`  
Color in HEX string, RGB array or RGB object to be inverted.  
- **`bw`** : `Boolean|Object`  
Optional. A boolean value indicating whether the output should be amplified to black (`#000000`) or white (`#ffffff`), according to the luminance of the original color. You can set custom black/white values by passing an object.  


```js
invert('#000')              // —> #ffffff
invert('#282b35')           // —> #d7d4ca

// amplify to black or white
invert('#282b35', true)     // —> #ffffff

// amplify to custom black or white color
invert('#282b35', { black: '#3a3a3a', white: '#fafafa' })     // —> #fafafa

// input color as RGB array or object
invert([69, 191, 189])              // —> #ba4042
invert({ r: 249, g: 119, b: 121 })  // —> #068886
```

### `invert.asRgbArray(color[, bw])`
Invert and output result as RGB **array**.

```js
invert.asRgbArray('#000')           // —> [255, 255, 255]
```

### `invert.asRgbObject(color[, bw])`
Invert and output result as RGB **object**.

```js
invert.asRgbObject('#fff')          // —> { r: 0, g: 0, b: 0 }
```

**`bw` option**

 This is useful in case, you need to create contrast (i.e. background vs foreground, for better readability). The animation at the top is a demonstration.

## Contributing

Clone original project:

```sh
git clone https://github.com/onury/invert-color.git
```

Install (dev) dependencies:

```sh
npm install
```

Add tests into [test/unit.spec.js](test/unit.spec.js) and run:  

```sh
npm test
```

Travis build should pass.

## Change-Log

### v1.1.0 (2017-11-07)

- Added ability to customize black/white color values. (PR [#3](https://github.com/onury/invert-color/pull/3) by [@BrainCrumbz](https://github.com/BrainCrumbz))
- Fix typo. (PR [#1](https://github.com/onury/invert-color/pull/1) by [@villfa](https://github.com/villfa))
- Minor revisions.

### v1.0.0 (2017-08-22)

- Initial version.

## License

[MIT][license].


[license]:https://github.com/onury/invert-color/blob/master/LICENSE
