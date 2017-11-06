# invert-color

> © 2017, Onur Yıldırım ([@onury](https://github.com/onury)). MIT License.

Generates inverted (opposite) version of the given color. 

_This passes a long test suite of **Adobe Photoshop CC** inverted colors...   
Generating exactly the same result with it._

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
- **`bw`** : `Boolean`  
Optional. A boolean value indicating whether the output should be amplified to black (`#000000`) or white (`#ffffff`), according to the luminance of the original color.


```js
invert('#000')              // —> #ffffff
invert('#282b35')           // —> #d7d4ca

// amplify to black or white
invert('#282b35', true)     // —> #ffffff

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

Clone original project (or fork and clone that):

```sh
git clone https://github.com/onury/invert-color.git
```

Install dependencies:

```sh
npm install
```

There's nothing to build. Run tests:

```sh
npm test
```

Add (failing) tests into [test/unit.spec.js](test/unit.spec.js) file.  
Add implementation.  
Pass tests.  
Refactor and repeat.

## License

[MIT][license].


[license]:https://github.com/onury/{{github-repo}}/blob/master/LICENSE
[fiddle]:http://jsfiddle.net/onury/uof868n4
[boxes]:http://jsfiddle.net/onury/uof868n4/embedded/result
[so]:https://stackoverflow.com/a/3943023/112731
[mransom]:https://stackoverflow.com/users/5987/mark-ransom
