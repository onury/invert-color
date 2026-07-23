/**
 *  invert-color
 *  Generates the inverted (opposite) version of a given color.
 *  @author Onur Yıldırım <onur@cutepilot.com>
 *  @license MIT
 */

// ---------------------------------------------------------------------------
//  TYPES
// ---------------------------------------------------------------------------

/** RGB color as an object with red, green and blue components (`0`–`255`). */
export type RGB = {
  r: number;
  g: number;
  b: number;
};

/** RGB color as a `[red, green, blue]` tuple (`0`–`255`). The shape returned by {@link invert.asRgbArray}. */
export type RgbArray = [number, number, number];

/**
 *  A color as a string — either a hex color (`'#282b35'`, `'fff'`, with or
 *  without a leading `#`) or a CSS `rgb()`/`rgba()` string (`'rgb(40, 43, 53)'`,
 *  `'rgba(40, 43, 53, 0.5)'`).
 */
export type HexColor = string;

/**
 *  A color the library can invert: a {@link HexColor} (or `rgb()`/`rgba()`)
 *  string, an `[r, g, b]` number array, or an {@link RGB} object.
 */
export type Color = RGB | number[] | HexColor;

/**
 *  Black/white pair (with an optional luminance threshold) used to amplify the
 *  inversion to a high-contrast color. Passed as the `bw` argument of
 *  {@link invert} and friends.
 */
export interface BlackWhite {
  /** Color returned for light sources. */
  black: HexColor;
  /** Color returned for dark sources. */
  white: HexColor;
  /**
   *  Relative-luminance cutoff (`0`–`1`) deciding black vs. white.
   *  Defaults to {@link invert.defaultThreshold}.
   */
  threshold?: number;
}

// Parsed color: normalized RGB channels plus an optional alpha (`0`–`1`).
interface Parsed {
  rgb: RgbArray;
  alpha?: number;
}

// ---------------------------------------------------------------------------
//  CONSTANTS
// ---------------------------------------------------------------------------

// WCAG-derived luminance midpoint (≈ 0.179) that best separates a color into
// "pair with black" vs. "pair with white". See https://stackoverflow.com/a/3943023
const DEFAULT_THRESHOLD = Math.sqrt(1.05 * 0.05) - 0.05;

const RE_HEX = /^(?:[0-9a-f]{3}){1,2}$/i;
// rgb(r, g, b) / rgba(r, g, b, a) — comma-separated, whitespace tolerated.
const RE_RGB = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/i;

const DEFAULT_BW: Required<BlackWhite> = {
  black: '#000000',
  white: '#ffffff',
  threshold: DEFAULT_THRESHOLD
};

// ---------------------------------------------------------------------------
//  HELPERS
// ---------------------------------------------------------------------------

/** Formats a `0`–`255` channel as a 2-digit hex pair. */
function toHex(n: number): string {
  return n.toString(16).padStart(2, '0');
}

function hexToRgbArray(hex: HexColor): RgbArray {
  let h = hex.startsWith('#') ? hex.slice(1) : hex;
  if (!RE_HEX.test(h)) throw new Error(`Invalid HEX color: "${hex}"`);
  // Expand shorthand: #abc → #aabbcc.
  if (h.length === 3) h = h.replace(/./g, '$&$&');
  return [
    Number.parseInt(h.slice(0, 2), 16),
    Number.parseInt(h.slice(2, 4), 16),
    Number.parseInt(h.slice(4, 6), 16)
  ];
}

// Validates a channel is a real number and normalizes it to a rounded integer in [0, 255].
function toChannel(value: number): number {
  if (!Number.isFinite(value)) throw new Error(`Invalid color channel: ${value}`);
  return Math.round(Math.min(255, Math.max(0, value)));
}

// Validates a parsed alpha is a real number (the regex already excludes negatives; >= 1 is opaque).
function toAlpha(value: number): number {
  if (!Number.isFinite(value)) throw new Error(`Invalid alpha value: ${value}`);
  return value;
}

// Normalizes any Color into RGB channels + optional alpha.
function parseColor(color: Color): Parsed {
  if (!color) throw new Error('Invalid color value');
  if (typeof color === 'string') {
    const m = RE_RGB.exec(color);
    if (m) {
      const [, r, g, b, a] = m;
      return {
        rgb: [toChannel(Number(r)), toChannel(Number(g)), toChannel(Number(b))],
        alpha: a === undefined ? undefined : toAlpha(Number(a))
      };
    }
    return { rgb: hexToRgbArray(color) };
  }
  const channels = Array.isArray(color) ? color : [color.r, color.g, color.b];
  if (channels.length !== 3) {
    throw new Error(`Invalid color value: expected 3 channels, got ${channels.length}`);
  }
  return { rgb: channels.map(toChannel) as RgbArray };
}

function toRGB([r, g, b]: RgbArray): RGB {
  return { r, g, b };
}

// Appends the alpha byte to a hex string when the color is (partly) transparent.
function withAlpha(hex: HexColor, alpha: number | undefined): HexColor {
  return alpha === undefined || alpha >= 1 ? hex : hex + toHex(Math.round(alpha * 255));
}

// Per-channel WCAG relative luminance (linearized sRGB).
function channelLuminance(c: number): number {
  const x = c / 255;
  // Stryker disable next-line EqualityOperator: the sRGB knee (x = 0.03928) is unreachable for integer 0–255 channels, so `<` vs `<=` is an equivalent mutant.
  return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}

function getLuminance([r, g, b]: RgbArray): number {
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

// Amplifies to the high-contrast black/white color chosen by luminance.
function invertToBW(rgb: RgbArray, bw: BlackWhite | true, asArr?: boolean): RgbArray | HexColor {
  const { black, white, threshold = DEFAULT_THRESHOLD } = bw === true ? DEFAULT_BW : bw;
  const hex = getLuminance(rgb) > threshold ? black : white;
  return asArr ? hexToRgbArray(hex) : hex;
}

function invertToArray(color: Color, bw?: BlackWhite | boolean): RgbArray {
  const { rgb } = parseColor(color);
  return bw ? (invertToBW(rgb, bw, true) as RgbArray) : (rgb.map((c) => 255 - c) as RgbArray);
}

// ---------------------------------------------------------------------------
//  PUBLIC API
// ---------------------------------------------------------------------------

/**
 *  Generates the inverted (opposite) version of the given color.
 *
 *  Accepts a hex string, a CSS `rgb()`/`rgba()` string, an `[r, g, b]` array, or
 *  an `{ r, g, b }` object. Channels are clamped to `0`–`255` and rounded;
 *  malformed input (a wrong-length array or a non-finite channel) throws. An
 *  `rgba()` alpha below `1` is preserved as the 8th/9th hex digit.
 *  @param color - Color to invert.
 *  @param bw - When truthy, amplifies the result to black or white (per the
 *  source luminance) for maximum contrast. Pass a {@link BlackWhite} object to
 *  customize the two colors and/or the luminance `threshold`.
 *  @returns The inverted color as a HEX string (8-digit `#rrggbbaa` when the
 *  input carried alpha below `1`).
 *  @example
 *  ```ts
 *  invert('#282b35');                          // → '#d7d4ca'
 *  invert('rgb(40, 43, 53)');                  // → '#d7d4ca'
 *  invert('rgba(40, 43, 53, 0.5)');            // → '#d7d4ca80'  (alpha preserved)
 *  invert([69, 191, 189]);                     // → '#ba4042'
 *  invert({ r: 249, g: 119, b: 121 });         // → '#068886'
 *  invert('#282b35', true);                    // → '#ffffff'  (amplified)
 *  ```
 */
function invert(color: Color, bw: BlackWhite | boolean = false): HexColor {
  const { rgb, alpha } = parseColor(color);
  const hex = bw
    ? (invertToBW(rgb, bw) as HexColor)
    : `#${rgb.map((c) => toHex(255 - c)).join('')}`;
  return withAlpha(hex, alpha);
}

/**
 *  Inverts the given color and returns it as an RGB object. Any alpha is dropped.
 *  @param color - Color to invert.
 *  @param bw - See {@link invert}'s `bw` argument.
 *  @returns The inverted color as an `{ r, g, b }` object.
 *  @example
 *  ```ts
 *  invert.asRGB('#ffffff');   // → { r: 0, g: 0, b: 0 }
 *  ```
 */
invert.asRGB = (color: Color, bw?: BlackWhite | boolean): RGB => toRGB(invertToArray(color, bw));

/**
 *  Inverts the given color and returns it as an RGB array. Any alpha is dropped.
 *  @param color - Color to invert.
 *  @param bw - See {@link invert}'s `bw` argument.
 *  @returns The inverted color as a `[r, g, b]` tuple.
 *  @example
 *  ```ts
 *  invert.asRgbArray('#000000');   // → [255, 255, 255]
 *  ```
 */
invert.asRgbArray = (color: Color, bw?: BlackWhite | boolean): RgbArray => invertToArray(color, bw);

/** Alias of {@link invert.asRGB}. */
invert.asRgbObject = invert.asRGB;

/** Default relative-luminance threshold (≈ `0.179`) used to amplify to black or white. */
invert.defaultThreshold = DEFAULT_THRESHOLD;

export default invert;
export { invert };
