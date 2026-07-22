# invert-color — Changelog

All notable changes to this project are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## 3.0.0 (2026-07-23)

Modernization release. The public API is unchanged — `invert()`, `invert.asRGB()`, `invert.asRgbArray()`, `invert.asRgbObject()` and `invert.defaultThreshold` all behave exactly as in v2. The breaking change is the packaging: the module is now **ESM-only**.

### Added

- A named export: `import { invert } from 'invert-color'` now works alongside the default `import invert from 'invert-color'` (both resolve to the same function).

### Changed

- **BREAKING — ESM-only.** Dropped the CommonJS and UMD bundles; the package now ships a single ESM build with type declarations. `require('invert-color')` and the `lib/invert.min.js` browser file are gone. If you need CommonJS/UMD, pin `invert-color@2`.
- **BREAKING — `engines`.** Now requires **Node.js >= 20**.
- Rewrote the internals against modern JavaScript: `String.prototype.padStart`, object spread, the `**` operator, and small pure helpers replace the hand-rolled zero-pad, `Object.assign` and `Math.pow`. Output is identical.
- Enabled `strict` TypeScript; tightened and re-exampled the public type declarations (TSDoc with `@example` blocks).

### Removed

- The `browser`, `module` and `jsnext:main` bundle fields and the multi-format build (rollup + uglify). Replaced by a single `tsc` build and an `exports` map.

### Tooling

- Migrated the toolchain: **Biome** (from TSLint), **Vitest** (from Jest), **GitHub Actions** (from Travis), and **Stryker** mutation testing.
- Test suite reaches **100% coverage** (statements, branches, functions, lines) and a **100% mutation score**.

## 2.0.0 (2018-11-09)

### Changed

- **BREAKING:** Switched to a **default export** only, for consistency. Added ESM, UMD and CommonJS bundles (via rollup). See the Usage section.
- `package.json` now also defines `module`, `jsnext:main` and `browser` alongside `main`.

### Added

- `threshold: number` option to the `BlackWhite` interface. Fixes [#16](https://github.com/onury/invert-color/issues/16).
- `invert.defaultThreshold` constant.

## 1.5.0 (2018-08-22)

### Changed

- Re-written in TypeScript.

### Added

- `.asRGB()` — alias of `.asRgbObject()`.

## 1.2.3 (2018-04-05)

### Changed

- Better error messages. (PR [#9](https://github.com/onury/invert-color/pull/9) by [@CAYdenberg](https://github.com/CAYdenberg)) Fixes [#8](https://github.com/onury/invert-color/issues/8).

## 1.2.2 (2017-12-07)

### Fixed

- An issue with UMD output. Fixes [#7](https://github.com/onury/invert-color/issues/7).

### Tooling

- Adapted webpack for UMD.

## 1.2.0 (2017-11-24)

### Added

- UMD support. (PR [#6](https://github.com/onury/invert-color/pull/6) by [@criography](https://github.com/criography) — revised for the latest Babel.)

### Tooling

- Migrated tests to Jest (dropped Jasmine).

## 1.1.0 (2017-11-07)

### Added

- Ability to customize black/white color values. (PR [#3](https://github.com/onury/invert-color/pull/3) by [@BrainCrumbz](https://github.com/BrainCrumbz))

### Fixed

- A typo. (PR [#1](https://github.com/onury/invert-color/pull/1) by [@villfa](https://github.com/villfa))

## 1.0.0 (2017-08-22)

- Initial version.
