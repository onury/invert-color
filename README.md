# invert-color

<p align="center">
    <a href="https://github.com/onury/invert-color/actions/workflows/ci.yml"><img src="https://github.com/onury/invert-color/actions/workflows/ci.yml/badge.svg" alt="build" /></a>
    <a href="https://github.com/onury/invert-color/actions/workflows/ci.yml"><img src="https://img.shields.io/badge/coverage-100%25-2BB150?logo=vitest&logoColor=%23FDC72B&style=flat" alt="coverage" /></a>
    <a href="https://stryker-mutator.io/docs/"><img src="https://img.shields.io/badge/mutation-100%25-2BB150?style=flat" alt="mutation score" /></a>
    <a href="https://www.npmjs.com/package/invert-color"><img src="https://img.shields.io/npm/v/invert-color.svg?style=flat&label=&color=%23C6234B&logo=npm" alt="version" /></a>
    <a href="https://www.npmjs.com/package/invert-color"><img src="https://img.shields.io/npm/dt/invert-color.svg?style=flat&color=2BB150" alt="downloads" /></a>
    <a href="https://github.com/onury/invert-color/blob/master/package.json"><img src="https://img.shields.io/badge/dependencies-0-2BB150?style=flat" alt="zero dependencies" /></a>
    <a href="https://gist.github.com/onury/d3f3d765d7db2e8b2d050d14315f2ac7"><img src="https://img.shields.io/badge/ESM-F7DF1E?style=flat" alt="ESM" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TS-3260C7?style=flat" alt="TS" /></a>
    <a href="https://github.com/onury/invert-color/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/invert-color.svg?style=flat&color=blue" alt="license" /></a>
</p>

> This module is **ESM** 🔆. Please [**read this**](https://gist.github.com/onury/d3f3d765d7db2e8b2d050d14315f2ac7).

> [!IMPORTANT]
> **v3 is ESM-only — a breaking change.** The CommonJS and UMD builds are gone: `require('invert-color')` no longer works, and the minimum Node.js is now **20**. If you still need CommonJS/UMD, stay on **v2** — `npm i invert-color@2`. See the [changelog](CHANGELOG.md#300-2026-07-23) for the full upgrade note.

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

// CSS rgb() / rgba() strings
invert('rgb(40, 43, 53)');           // → '#d7d4ca'
invert('rgba(40, 43, 53, 0.5)');     // → '#d7d4ca80'  (alpha preserved as 8-digit hex)
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
| `color` | `HexColor \| number[] \| RGB` | The color to invert. Accepts a HEX string (3- or 6-digit, with or without `#`), a CSS `rgb()`/`rgba()` string, an `[r, g, b]` array, or an `{ r, g, b }` object. |
| `bw` | `boolean \| BlackWhite` | Optional. `true` amplifies to black/white by luminance. An object customizes `black`, `white` and/or `threshold`. Defaults to `false`. |

**Types**

```ts
type RGB = { r: number; g: number; b: number };
type RgbArray = [number, number, number];   // the shape returned by asRgbArray
type HexColor = string;                      // hex, or a CSS rgb()/rgba() string
type Color = RGB | number[] | HexColor;

interface BlackWhite {
    black: HexColor;
    white: HexColor;
    threshold?: number; // 0–1, defaults to invert.defaultThreshold
}
```

> [!NOTE]
> **Input handling.** Array/object channels are clamped to `0`–`255` and rounded, so out-of-range values degrade predictably (`invert([300, 300, 300]) → '#000000'`). Malformed input — a non-`3`-length array or a non-finite channel — throws, as does an invalid HEX or `rgb()` string.
>
> **Alpha.** An `rgba()` alpha below `1` is preserved on `invert()` as the trailing hex byte (`#rrggbbaa`); `asRGB` / `asRgbArray` return RGB only and drop it.

## Changelog

See [**CHANGELOG.md**](CHANGELOG.md). Version 3 is **ESM-only**; if you still need CommonJS/UMD, pin `invert-color@2`.

## License

© 2026, Onur Yıldırım. [**MIT**][license] License.

[license]: https://github.com/onury/invert-color/blob/master/LICENSE
