# invert-color

<p align="center">
    <a href="https://github.com/onury/invert-color/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/onury/invert-color/ci.yml?branch=master&style=flat" alt="build status" /></a>
    <a href="https://github.com/onury/invert-color"><img src="https://img.shields.io/badge/coverage-100%25-2BB150.svg?style=flat" alt="coverage" /></a>
    <a href="https://github.com/onury/invert-color"><img src="https://img.shields.io/badge/mutation-100%25-2BB150.svg?style=flat" alt="mutation score" /></a>
    <a href="https://www.npmjs.com/package/invert-color"><img src="https://img.shields.io/npm/v/invert-color.svg?style=flat&logo=npm&label=&color=C6234B" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/invert-color"><img src="https://img.shields.io/npm/dm/invert-color.svg?style=flat&color=C6234B" alt="downloads" /></a>
    <a href="https://github.com/onury/invert-color"><img src="https://img.shields.io/badge/dependencies-0-2BB150.svg?style=flat" alt="zero dependencies" /></a>
    <a href="https://gist.github.com/onury/d3f3d765d7db2e8b2d050d14315f2ac7"><img src="https://img.shields.io/badge/module-ESM-F7DF1E.svg?style=flat" alt="ESM" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/written%20in-TypeScript-3260C7.svg?style=flat" alt="TypeScript" /></a>
    <a href="https://github.com/onury/invert-color/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/invert-color.svg?style=flat&color=2BB150" alt="license" /></a>
</p>

> This module is **ESM** 🔆. Please [**read this**](https://gist.github.com/onury/d3f3d765d7db2e8b2d050d14315f2ac7).

Generates the inverted (opposite) version of a given color. Tiny, zero-dependency, and typed.

<p align="center">
    <img src="https://github.com/onury/invert-color/blob/master/art/invert-animation.gif?raw=true" alt="invert-color animation" />
</p>

> [!NOTE]
> The results match **Adobe Photoshop CC** exactly — the suite is verified against a long list of Photoshop-inverted colors.

## Installation

```sh
npm i invert-color
```

## Usage

```ts
import invert from 'invert-color';
// or a named import — both resolve to the same function:
import { invert } from 'invert-color';
// with types:
import invert, { type RGB, type RgbArray, type HexColor, type BlackWhite } from 'invert-color';
```

```ts
invert('#000');                      // → '#ffffff'
invert('#282b35');                   // → '#d7d4ca'

// RGB array or object input
invert([69, 191, 189]);              // → '#ba4042'
invert({ r: 249, g: 119, b: 121 });  // → '#068886'
```

### Amplify to Black or White

Pass `bw: true` to amplify the result to black or white — chosen by the source color's luminance. Handy for picking a readable foreground over a given background.

```ts
invert('#282b35', true);   // → '#ffffff'
invert('#d7d4ca', true);   // → '#000000'
```

Pass an object to customize the two colors, and/or the luminance `threshold`:

```ts
invert('#282b35', { black: '#3a3a3a', white: '#fafafa' });                   // → '#fafafa'
invert('#282b35', { black: '#3a3a3a', white: '#fafafa', threshold: 0.01 });  // → '#3a3a3a'
```

> [!TIP]
> `bw` is ideal for contrast — e.g. a background vs. its foreground text — so content stays legible. The animation above is exactly this in action.

### Other Output Shapes

```ts
invert.asRGB('#fff');        // → { r: 0, g: 0, b: 0 }
invert.asRgbArray('#000');   // → [255, 255, 255]
invert.asRgbObject('#fff');  // → { r: 0, g: 0, b: 0 }   (alias of asRGB)
```

## API

| Member | Signature | Description |
| ------ | --------- | ----------- |
| `invert` | `(color, bw?) => HexColor` | Inverts `color`, returns a HEX string. |
| `invert.asRGB` | `(color, bw?) => RGB` | Inverts `color`, returns an `{ r, g, b }` object. |
| `invert.asRgbArray` | `(color, bw?) => RgbArray` | Inverts `color`, returns a `[r, g, b]` tuple. |
| `invert.asRgbObject` | `(color, bw?) => RGB` | Alias of `invert.asRGB`. |
| `invert.defaultThreshold` | `number` | Default luminance threshold (≈ `0.179`) used to amplify to black/white. |

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `color` | `HexColor \| RgbArray \| RGB` | The color to invert. HEX may be 3- or 6-digit, with or without a leading `#`. |
| `bw` | `boolean \| BlackWhite` | Optional. `true` amplifies to black/white by luminance. An object customizes `black`, `white` and/or `threshold`. Defaults to `false`. |

**Types**

```ts
type RGB = { r: number; g: number; b: number };
type RgbArray = [number, number, number];
type HexColor = string;
type Color = RGB | RgbArray | HexColor;

interface BlackWhite {
    black: HexColor;
    white: HexColor;
    threshold?: number; // 0–1, defaults to invert.defaultThreshold
}
```

## Related

- [**tinycolor2**](https://github.com/scttcper/tinycolor) — a fuller color-manipulation toolkit, when you need more than inversion.

## Changelog

See [**CHANGELOG.md**](CHANGELOG.md). Version 3 is **ESM-only**; if you still need CommonJS/UMD, pin `invert-color@2`.

## License

© 2026, Onur Yıldırım. [**MIT**][license] License.

[license]: https://github.com/onury/invert-color/blob/master/LICENSE
