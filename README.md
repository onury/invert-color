# invert-color

> © 2017, Onur Yıldırım ([@onury](https://github.com/onury)). MIT License.

Generates inverted (opposite) version of the given color. 

_This passes a long test suite of Adobe Photoshop CC inverted colors...   
Generating exactly the same result with it._

## Installation

```sh
npm i invert-color --save
```

## Usage

```js
const invert = require('invert-color');
```

###  `invert(color[, bw])` : `String`

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

###  `invert.asRgbArray(color[, bw])` : `Array`

```js
// output as RGB array
invert.asRgbArray('#000')           // —> [255, 255, 255]
```

###  `invert.asRgbArray(color[, bw])`  : `Object`

```js
// output as RGB object
invert.asRgbObject('#fff')          // —> { r: 0, g: 0, b: 0 }
```

### `bw` option

 This is useful in case, you need to create contrast (i.e. background vs foreground, for better readability).


## License

[MIT][license].


[license]:https://github.com/onury/{{github-repo}}/blob/master/LICENSE
[fiddle]:http://jsfiddle.net/onury/uof868n4
[boxes]:http://jsfiddle.net/onury/uof868n4/embedded/result
[so]:https://stackoverflow.com/a/3943023/112731
[mransom]:https://stackoverflow.com/users/5987/mark-ransom
